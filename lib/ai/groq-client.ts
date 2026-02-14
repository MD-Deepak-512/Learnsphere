import Groq from 'groq-sdk';

// Production API key from environment
const GROQ_API_KEY = process.env.GROQ_API_KEY || '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';

// Initialize Groq client
const groq = new Groq({
    apiKey: GROQ_API_KEY,
});

// List of models to try in order (fastest to most capable)
const MODELS = [
    'llama-3.3-70b-versatile',
    'llama-3.1-70b-versatile',
    'mixtral-8x7b-32768',
];

async function tryGenerate(modelName: string, prompt: string): Promise<string> {
    const chatCompletion = await groq.chat.completions.create({
        messages: [
            {
                role: 'user',
                content: prompt,
            },
        ],
        model: modelName,
        temperature: 0.7,
        max_tokens: 8000,
    });

    return chatCompletion.choices[0]?.message?.content || '';
}

export async function generateContent(prompt: string): Promise<string> {
    // Try all models in order
    for (const modelName of MODELS) {
        try {
            console.log(`Attempting generation with Groq Model: ${modelName}`);
            const result = await tryGenerate(modelName, prompt);
            if (result) {
                return result;
            }
        } catch (error: any) {
            console.warn(`Groq Model ${modelName} failed:`, error.message);
            // Continue to next model
            continue;
        }
    }

    // All attempts failed - throw error
    throw new Error('Failed to generate content: All Groq API attempts exhausted. Please check your API key and quota.');
}
