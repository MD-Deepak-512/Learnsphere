import { NextRequest, NextResponse } from 'next/server';
import { generateContent } from '@/lib/ai/groq-client';
import { getCodeGenerationPrompt } from '@/lib/ai/prompts/code-generation';
import { DepthLevel } from '@/types';
import { cleanAndParseJSON } from '@/lib/ai/json-helper';

export async function POST(request: NextRequest) {
    try {
        const { topic, complexity } = await request.json() as { topic: string; complexity: DepthLevel };

        if (!topic || !complexity) {
            return NextResponse.json(
                { success: false, error: 'Topic and complexity are required' },
                { status: 400 }
            );
        }

        // ... inside POST
        const prompt = getCodeGenerationPrompt(topic, complexity);
        const rawResponse = await generateContent(prompt);

        const data = cleanAndParseJSON(rawResponse);
        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Code generation error:', error);
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : 'Generation failed' },
            { status: 500 }
        );
    }
}
