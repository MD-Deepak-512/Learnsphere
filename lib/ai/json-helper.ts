import JSON5 from 'json5';

export function cleanAndParseJSON(text: string): any {
    // 1. Extract the outermost JSON object
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');

    if (start === -1 || end === -1 || start > end) {
        throw new Error('No JSON object found in response');
    }

    let jsonStr = text.substring(start, end + 1);

    // 2. Remove any markdown code block syntax if it got included inside
    jsonStr = jsonStr.replace(/```json/g, '').replace(/```/g, '');

    // 3. First attempt to parse with JSON5
    try {
        return JSON5.parse(jsonStr);
    } catch (e: any) {
        console.warn('Initial JSON5 parse failed, attempting advanced sanitization:', e.message);

        // 4. Advanced Sanitization
        let sanitized = jsonStr;

        // A. Handle literal newlines inside strings
        // This regex finds content between double quotes (multiline) and replaces literal newlines with \n
        sanitized = sanitized.replace(/"((?:(?!"|\\)[\s\S]|\\.)*?)"/g, (match, p1) => {
            return '"' + p1.replace(/\n/g, '\\n').replace(/\r/g, '\\r') + '"';
        });

        // B. Fix "Bad escaped character" (like \theta, \sigma)
        // We look for a backslash NOT followed by valid JSON escape characters
        // Valid: " \ / b f n r t u
        sanitized = sanitized.replace(/\\([^"\\\/bfnrtu])/g, '\\\\$1');

        // 5. Second attempt with sanitized string
        try {
            return JSON5.parse(sanitized);
        } catch (e2: any) {
            console.error('Final JSON parse failed. Sanitized string:', sanitized);
            // If it still fails, let's try one more desperate measure: 
            // Replace any remaining control characters that might be breaking it
            try {
                const verySanitized = sanitized.replace(/[\x00-\x1F\x7F-\x9F]/g, (c) => {
                    const escapes: Record<string, string> = { '\n': '\\n', '\r': '\\r', '\t': '\\t' };
                    return escapes[c] || '';
                });
                return JSON5.parse(verySanitized);
            } catch (e3) {
                throw new Error(`Failed to parse JSON: ${e2.message}`);
            }
        }
    }
}
