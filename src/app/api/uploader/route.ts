import { createClient } from '@supabase/supabase-js';
import { pipeline } from '@xenova/transformers';
import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
//@ts-ignore
import pdfParse from 'pdf-parse';


const supabase = createClient(
    process.env.SUPABASE_URL ?? '',
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''
);

const extractor = await pipeline('feature-extraction', 'Xenova/all-distilroberta-v1');

async function extractTextFromPDF(filePath: string): Promise<string> {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text;
}

function chunkText(text: string, maxChunkSize = 768): string[] {
    // Basic sentence splitter using regex (splits on '.', '!', '?')
    const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [text];
    const chunks: string[] = [];
    let currentChunk = "";
  
    for (const sentence of sentences) {
      // Check if adding this sentence exceeds maxChunkSize
      if ((currentChunk + sentence).length > maxChunkSize) {
        if (currentChunk) chunks.push(currentChunk.trim());
        currentChunk = sentence;
      } else {
        currentChunk += sentence;
      }
    }
  
    // Add last chunk if any
    if (currentChunk) chunks.push(currentChunk.trim());
  
    return chunks;
  }
  
  async function getEmbedding(text: string): Promise<number[]> {
    const output = await extractor(text);
    const data = await output.data;
    const embeddingSize = 768;
    const tokenCount = data.length / embeddingSize;
    const avgEmbedding = new Array(embeddingSize).fill(0);
  
    for (let i = 0; i < data.length; i++) {
      avgEmbedding[i % embeddingSize] += data[i];
    }
  
    for (let i = 0; i < embeddingSize; i++) {
      avgEmbedding[i] /= tokenCount;
    }
  
    return avgEmbedding;
  }
  
  

async function uploadChunksToSupabase(chunks: string[]) {
    for (const [index, chunk] of chunks.entries()) {
        const embedding = await getEmbedding(chunk);

        const { error } = await supabase
            .from('resume_chunks')
            .insert([{ content: chunk, embedding }]);

        if (error) {
            console.error(`Error inserting chunk ${index}:`, error);
        } else {
            console.log(`Chunk ${index} uploaded successfully.`);
        }
    }
}

export async function POST(req: NextRequest) {
    try {
        // Fetch PDF from your public folder URL
        const pdfUrl = 'http://localhost:3000/documents/resume.pdf';

        const response = await fetch(pdfUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch PDF');
        }

        const pdfBuffer = Buffer.from(await response.arrayBuffer());

        // Parse PDF text
        const data = await pdfParse(pdfBuffer);
        const text = data.text;

        const chunks = chunkText(text);
        console.log('First chunk:', chunks[0]);
        console.log(`Total chunks: ${chunks.length}`);

        await uploadChunksToSupabase(chunks);

        return NextResponse.json({ message: 'Upload success', totalChunks: chunks.length });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: 'Upload failed',
            error: error instanceof Error ? error.message : 'An unknown error occurred'
        }, { status: 500 });
    }
}
