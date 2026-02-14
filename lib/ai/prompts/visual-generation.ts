export function getVisualGenerationPrompt(topic: string): string {
  return `You are an expert ML educator specializing in visual explanations. Generate structured visual diagram descriptions for "${topic}".

Create educational diagram descriptions that explain the concept visually. For each diagram, provide an SVG representation.

IMPORTANT: Return your response as valid, parseable JSON with this exact structure:
{
  "title": "Visual Explanation Title",
  "descriptions": [
    {
      "label": "Diagram Label (e.g., 'Architecture Overview')",
      "description": "Brief text description of what this diagram shows",
      "svgContent": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500'>...</svg>"
    }
  ]
}

JSON Safety Rules:
1. DO NOT include literal newlines within string values. Use \\n instead.
2. DO NOT use markdown code blocks (\`\`\`json) or any wrapping text.
3. Escape all backslashes and quotes within the SVG content properly.
4. Use standard double quotes (") for all JSON strings.

Requirements for SVG diagrams:
- Create 2-4 educational diagrams
- Use clean, professional styling with #00FF88 (primary green), #0B0F14 (dark background), #E6F1F0 (light text)
- Include labeled boxes, arrows, and connections
- Make diagrams educational and clear
- Each SVG must be valid XML
- Use viewBox="0 0 800 500" for consistent sizing &responsive scaling
- Ensure text is legible (font-size > 14)
- CRITICAL: Return ONLY raw, valid JSON.`;
}
