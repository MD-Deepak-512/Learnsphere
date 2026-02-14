'use client';

import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { DepthLevel, GeneratedCodeContent } from '@/types';
import styles from './modules.module.css';

export default function CodeGeneration() {
    const [topic, setTopic] = useState('');
    const [complexity, setComplexity] = useState<DepthLevel>('moderate');
    const [result, setResult] = useState<GeneratedCodeContent | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    const handleGenerate = async () => {
        if (!topic.trim()) return;
        setLoading(true);
        setError('');
        setResult(null);

        try {
            const res = await fetch('/api/generate/code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic: topic.trim(), complexity }),
            });

            const json = await res.json();
            if (json.success) {
                setResult(json.data);
            } else {
                setError(json.error || 'Generation failed');
            }
        } catch {
            setError('Failed to connect. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const copyCode = () => {
        if (!result) return;
        navigator.clipboard.writeText(result.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const downloadCode = () => {
        if (!result) return;
        const blob = new Blob([result.code], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${result.title.replace(/\s+/g, '_').toLowerCase()}.py`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className={styles.module}>
            <div className={styles.inputSection}>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Algorithm / Concept</label>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="e.g., K-Means Clustering, Random Forest, CNN..."
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Complexity Level</label>
                    <div className={styles.depthSelector}>
                        {(['brief', 'moderate', 'comprehensive'] as DepthLevel[]).map((d) => (
                            <button
                                key={d}
                                className={`${styles.depthBtn} ${complexity === d ? styles.depthActive : ''}`}
                                onClick={() => setComplexity(d)}
                            >
                                {d.charAt(0).toUpperCase() + d.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    className={styles.generateBtn}
                    onClick={handleGenerate}
                    disabled={loading || !topic.trim()}
                >
                    {loading ? (
                        <>
                            <span className={styles.spinner} />
                            Generating Code...
                        </>
                    ) : (
                        <>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <path d="M6 4L2 9L6 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 4L16 9L12 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Generate Code
                        </>
                    )}
                </button>
            </div>

            {error && (
                <div className={styles.error}>
                    <span>⚠</span> {error}
                </div>
            )}

            {result && (
                <div className={styles.resultSection}>
                    <div className={styles.resultHeader}>
                        <h2 className={styles.resultTitle}>{result.title}</h2>
                    </div>

                    {/* Dependencies */}
                    {result.dependencies && result.dependencies.length > 0 && (
                        <div className={styles.dependencyRow}>
                            <span className={styles.depLabel}>Dependencies:</span>
                            {result.dependencies.map((dep, i) => (
                                <span key={i} className={styles.depBadge}>{dep}</span>
                            ))}
                        </div>
                    )}

                    {/* Code Editor */}
                    <div className={styles.codeContainer}>
                        <div className={styles.codeHeader}>
                            <span className={styles.codeLang}>{result.language || 'python'}</span>
                            <div className={styles.codeActions}>
                                <button className={styles.actionBtn} onClick={copyCode} title="Copy code">
                                    {copied ? '✓ Copied' : (
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <rect x="5" y="5" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" />
                                            <path d="M3 11V3C3 2.44772 3.44772 2 4 2H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                    )}
                                </button>
                                <button className={styles.actionBtn} onClick={downloadCode} title="Download">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M8 2V10M8 10L5 7M8 10L11 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M2 12V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <SyntaxHighlighter
                            language={result.language || 'python'}
                            style={oneDark}
                            showLineNumbers
                            customStyle={{
                                margin: 0,
                                borderRadius: '0 0 12px 12px',
                                background: '#0F141A',
                                fontSize: '0.85rem',
                                padding: '20px',
                            }}
                        >
                            {result.code}
                        </SyntaxHighlighter>
                    </div>

                    {/* Explanation */}
                    {result.explanation && (
                        <div className={styles.explanationBox}>
                            <h3>💡 Explanation</h3>
                            <p>{result.explanation}</p>
                        </div>
                    )}

                    {/* Execution Instructions */}
                    {result.executionInstructions && (
                        <div className={styles.instructionBox}>
                            <h3>▶ How to Run</h3>
                            <p>{result.executionInstructions}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
