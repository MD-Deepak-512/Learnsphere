import { NextRequest, NextResponse } from 'next/server';
import { generateContent } from '@/lib/ai/groq-client';
import { getTextExplanationPrompt } from '@/lib/ai/prompts/text-explanation';
import { DepthLevel } from '@/types';
import { cleanAndParseJSON } from '@/lib/ai/json-helper';

export async function POST(request: NextRequest) {
    try {
        const { topic, depth } = await request.json() as { topic: string; depth: DepthLevel };

        if (!topic || !depth) {
            return NextResponse.json(
                { success: false, error: 'Topic and depth are required' },
                { status: 400 }
            );
        }

        // ... inside POST
        const prompt = getTextExplanationPrompt(topic, depth);
        const rawResponse = await generateContent(prompt);

        const data = cleanAndParseJSON(rawResponse);
        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Text generation error:', error);
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : 'Generation failed' },
            { status: 500 }
        );
    }
}
