import { NextRequest, NextResponse } from 'next/server';
import { generateContent } from '@/lib/ai/groq-client';
import { getVisualGenerationPrompt } from '@/lib/ai/prompts/visual-generation';
import { cleanAndParseJSON } from '@/lib/ai/json-helper';

export async function POST(request: NextRequest) {
    try {
        const { topic } = await request.json() as { topic: string };

        if (!topic) {
            return NextResponse.json(
                { success: false, error: 'Topic is required' },
                { status: 400 }
            );
        }

        // ... inside POST
        const prompt = getVisualGenerationPrompt(topic);
        const rawResponse = await generateContent(prompt);

        const data = cleanAndParseJSON(rawResponse);
        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Visual generation error:', error);
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : 'Generation failed' },
            { status: 500 }
        );
    }
}
