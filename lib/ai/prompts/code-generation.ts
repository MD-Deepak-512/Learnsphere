import { DepthLevel } from '@/types';

export function getCodeGenerationPrompt(topic: string, complexity: DepthLevel): string {
  const complexityInstructions = {
    brief: 'Generate a simple, minimal code example (50-100 lines) that demonstrates the core concept with basic implementation.',
    moderate: 'Generate a moderately detailed code example (100-200 lines) with proper data handling, model training, evaluation metrics, and visualization.',
    comprehensive: 'Generate a comprehensive, production-quality code example (200-400 lines) with data preprocessing, model implementation, hyperparameter tuning, cross-validation, visualization, and detailed analysis.'
  };

  return `You are an expert ML engineer and educator. Generate a complete, executable Python code example for "${topic}".

${complexityInstructions[complexity]}

IMPORTANT: Return your response as valid, parseable JSON with this exact structure:
{
  "title": "Code Example Title",
  "language": "python",
  "code": "# Complete executable Python code here\\n# Use proper formatting with \\n for newlines",
  "dependencies": ["numpy", "scikit-learn", "matplotlib"],
  "explanation": "Brief explanation of what the code does and how it works",
  "executionInstructions": "Step-by-step instructions to run this code"
}

JSON Safety Rules:
1. DO NOT include literal newlines within string values. Use \\n instead.
2. DO NOT use markdown code blocks (\`\`\`json) or any wrapping text.
3. Escape all backslashes properly (especially in code clusters).
4. Use standard double quotes (") for all strings.

Requirements:
- Code must be complete and runnable
- Include comprehensive inline comments
- Use popular ML libraries (scikit-learn, numpy, pandas, matplotlib, tensorflow/pytorch)
- Include sample/synthetic data generation so it runs without external datasets
- Add print statements showing results
- Add visualization code where appropriate
- CRITICAL: Return ONLY raw, valid JSON.`;
}
