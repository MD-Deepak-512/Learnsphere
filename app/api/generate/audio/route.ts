import { NextRequest, NextResponse } from 'next/server';
import { generateContent } from '@/lib/ai/gemini-client';
import { getAudioScriptPrompt } from '@/lib/ai/prompts/audio-script';
import { AudioLength } from '@/types';

export async function POST(request: NextRequest) {
    try {
        const { topic, length } = await request.json() as { topic: string; length: AudioLength };

        if (!topic) {
            return NextResponse.json(
                { success: false, error: 'Topic is required' },
                { status: 400 }
            );
        }

        const validLength: AudioLength = (length === 'detailed') ? 'detailed' : 'brief';
        const prompt = getAudioScriptPrompt(topic, validLength);

        const rawResponse = await generateContent(prompt);

        const jsonMatch = rawResponse.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            return NextResponse.json(
                { success: false, error: 'Failed to parse AI response' },
                { status: 500 }
            );
        }

        const data = JSON.parse(jsonMatch[0]);
        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Audio script generation error:', error);
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : 'Generation failed' },
            { status: 500 }
        );
    }
}
