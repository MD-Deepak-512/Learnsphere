import { AudioLength } from '@/types';

export function getAudioScriptPrompt(topic: string, length: AudioLength): string {
  const lengthInstructions = {
    brief: 'Create a brief 2-3 minute conversational script (about 400-600 words).',
    detailed: 'Create a detailed 5-8 minute conversational script (about 1000-1500 words).'
  };

  return `You are an expert ML educator creating an engaging audio lesson. Generate a conversational educational script about "${topic}" for ML learners.

${lengthInstructions[length]}

IMPORTANT: Return your response as valid, parseable JSON with this exact structure:
{
  "title": "Audio Lesson Title",
  "script": "The full conversational script text here. Write it as natural speech, as if a knowledgeable friend is explaining the concept. Use pauses (indicated by ...) and emphasis naturally.",
  "duration": "Estimated duration (e.g., '3 minutes')"
}

JSON Safety Rules:
1. DO NOT include literal newlines within string values. Use \\n instead.
2. DO NOT use markdown code blocks (\`\`\`json) or any wrapping text.
3. Escape all backslashes properly.
4. Use standard double quotes (") for all strings.

Requirements:
- Write in a warm, conversational tone as if speaking to a student
- Break complex ideas into digestible parts
- Use analogies and real-world examples
- Include natural transitions between concepts
- Avoid overly technical jargon without explanation
- Make it engaging and easy to follow by ear
- CRITICAL: Return ONLY raw, valid JSON.`;
}
