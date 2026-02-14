import { DepthLevel } from '@/types';

export function getTextExplanationPrompt(topic: string, depth: DepthLevel): string {
  const depthInstructions = {
    brief: 'Provide a concise explanation in about 300-500 words. Focus on the key definition, core intuition, and 2-3 main use cases.',
    moderate: 'Provide a moderately detailed explanation in about 800-1200 words. Include definition, mathematical intuition (if applicable), step-by-step explanation of how it works, advantages and limitations, and practical use cases.',
    comprehensive: 'Provide a comprehensive, in-depth explanation in about 1500-2500 words. Include detailed definition, mathematical foundations and formulas, step-by-step algorithmic explanation, implementation considerations, comparisons with similar approaches, real-world applications, advantages/limitations, and a thorough summary.'
  };

  return `You are an expert Machine Learning educator. Generate a structured educational explanation about "${topic}" for ML learners.

${depthInstructions[depth]}

IMPORTANT: Return your response as valid, parseable JSON with this exact structure:
{
  "title": "Topic Title",
  "sections": [
    {
      "heading": "Section Heading",
      "content": "Section content with clear explanations. Use markdown formatting for formulas, lists, etc."
    }
  ],
  "summary": "A concise summary paragraph of the key takeaways"
}

JSON Safety Rules:
1. DO NOT include literal newlines within string values. Use \\n instead.
2. DO NOT use markdown code blocks (\`\`\`json) or any wrapping text.
3. Escape all backslashes properly (e.g., use \\\\theta instead of \\theta for LaTeX).
4. Use standard double quotes (") for all strings.

Requirements:
- Make explanations clear and educational
- Use analogies where helpful
- Include mathematical notation where relevant (using LaTeX-style markdown)
- Structure content logically from basics to advanced
- Ensure accuracy and depth appropriate for ML learners
- CRITICAL: Return ONLY raw, valid JSON.`;
}
