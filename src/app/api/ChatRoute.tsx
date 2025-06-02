import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { pipeline } from "@xenova/transformers";

const supabase = createClient(
    process.env.SUPABASE_URL ?? "",
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? "" // Use service role key
);

const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

async function getEmbedding(text: string): Promise<number[]> {
    const output = await extractor(text);
    const data = output.data; // returns number[][]
    const embedding = data[0]; // [CLS] token's embedding vector (768 dims)
    console.log(embedding); // [0.1, 0.2, ..., 0.768] // 768 dims of floating point numbers, one for each dimension of the embedding vector
    return embedding;
}

export async function POST(request: Request) {
    try {
        const { message } = await request.json();

        if (!message) {
            return NextResponse.json({ error: "No message provided" }, { status: 400 });
        }

        // 1. Generate embedding from user question
        const queryEmbedding = await getEmbedding(message);

        // 2. Query matching resume chunks from Supabase using pgvector
        const { data, error } = await supabase.rpc("match_resume_chunks", {
            query_embedding: queryEmbedding,
            match_threshold: 0.7, // optional threshold
            match_count: 5,       // return top 5 chunks
        });

        if (error) {
            console.error("Error querying resume chunks:", error);
            return NextResponse.json({ error: "Failed to search resume chunks" }, { status: 500 });
        }

        // 3. Combine retrieved chunks into a knowledge base
        const knowledgeBaseContent = data.map((row: { content: string }) => row.content).join("\n\n");

        // 4. Prepare system prompt
        const SYSTEM_PROMPT = `
You are a helpful assistant for my resume website.
Use the following knowledge base to answer user questions accurately:

${knowledgeBaseContent}

Rules:
1. Keep answers short, clear, and friendly.
2. If you don't know the answer, say: "Sorry, I don't know."
3. Avoid answering personal or sensitive questions.
4. Respond only in plain text, no markdown.
    `;


    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
