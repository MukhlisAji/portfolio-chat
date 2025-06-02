import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { pipeline } from "@xenova/transformers";
import Groq from "groq-sdk";

const groq = new Groq();

const supabase = createClient(
    process.env.SUPABASE_URL ?? "",
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? ""
);

const extractor = await pipeline("feature-extraction", "Xenova/all-distilroberta-v1");

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

export async function POST(request: Request) {
    try {
        const { message } = await request.json();

        if (!message) {
            return NextResponse.json({ error: "No message provided" }, { status: 400 });
        }

        const queryEmbedding = await getEmbedding(message);
        console.log("Query embedding:", queryEmbedding);

        const { data, error } = await supabase.rpc("match_resume_chunks", {
            query_embedding: queryEmbedding,
            match_threshold: null,
            match_count: 5,
        });

        if (error) {
            console.error("Error querying resume chunks:", error);
            return NextResponse.json({ error: "Failed to search resume chunks" }, { status: 500 });
        }

        const knowledgeBaseContent = data.map((row: { content: string; metadata?: { section?: string; page_number?: number } }) => {
            const section = row.metadata?.section ?? "Unknown Section";
            const page = row.metadata?.page_number ? `Page ${row.metadata.page_number}` : "";
            return `[${section}${page ? ` - ${page}` : ""}]\n${row.content}`;
        }).join("\n\n");

        console.log("Knowledge base content:", knowledgeBaseContent);

        const now = new Date();
        const formattedDate = now.toLocaleString('id-ID', {
            month: 'long',
            year: 'numeric',
        });

        const SYSTEM_PROMPT = `
You are an AI assistant that speaks as if you are Aji, a xperienced Fullstack Java Developer with 6 years of hands-on experience building enterprise applications using Java, Spring Boot, Next.js and React.js.
 Proven success in designing scalable systems, integrating APIs, and deploying cloud-native apps on AWS, GCP, and Azure DevOps.

    When answering questions, always:
    - Use examples from your career to clarify your answers if relevant.
    - Be honest about your strengths and areas of growth.
    - Maintain a professional yet friendly tone.
    - Keep your responses concise and to the point.
    - Use emojis to add personality and engagement.
    - Use the current Date context to provide relevant information.
    - If the question is not relevant to your expertise, politely decline.
    - If the question is about your work experience, provide details about your role, responsibilities, and achievements.
    - If asked about specific technologies or projects, explain how you used them and the impact they had.
    - Dont mention any tech stack you are not familiar with.
    - Avoid answering personal or sensitive questions.
    - Respond only in plain text, no markdown.
    
    Use the following knowledge base to answer user questions accurately:

    ${knowledgeBaseContent}

    Additional Information for the current Date context:
    Current: ${formattedDate}
    `;

        const chatCompletion = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",
            temperature: 1,
            max_completion_tokens: 1024,
            top_p: 0.9,
            stream: true,
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: message },
            ],
        });

        let aiResponse = "";
        for await (const chunk of chatCompletion) {
            aiResponse += chunk.choices[0]?.delta?.content || "";
        }

        return NextResponse.json({
            reply: aiResponse,
            references: data 
        });

    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
