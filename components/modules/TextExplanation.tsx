'use client';

import React, { useState } from 'react';
import { DepthLevel, GeneratedTextContent } from '@/types';
import styles from './modules.module.css';
import TypingText from '../ui/TypingText';

export default function TextExplanation() {
    const [topic, setTopic] = useState('');
    const [depth, setDepth] = useState<DepthLevel>('moderate');
    const [result, setResult] = useState<GeneratedTextContent | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());

    const handleGenerate = async () => {
        if (!topic.trim()) return;
        setLoading(true);
        setError('');
        setResult(null);

        try {
            const res = await fetch('/api/generate/text', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic: topic.trim(), depth }),
            });

            const json = await res.json();
            if (json.success) {
                setResult(json.data);
                // Expand all sections by default
                setExpandedSections(new Set(json.data.sections.map((_: unknown, i: number) => i)));
            } else {
                setError(json.error || 'Generation failed');
            }
        } catch {
            setError('Failed to connect. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const toggleSection = (index: number) => {
        setExpandedSections(prev => {
            const next = new Set(prev);
            if (next.has(index)) next.delete(index);
            else next.add(index);
            return next;
        });
    };

    const downloadAsText = () => {
        if (!result) return;
        let content = `# ${result.title}\n\n`;
        result.sections.forEach(s => {
            content += `## ${s.heading}\n\n${s.content}\n\n`;
        });
        content += `## Summary\n\n${result.summary}`;

        const blob = new Blob([content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${result.title.replace(/\s+/g, '_')}.md`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const copyToClipboard = () => {
        if (!result) return;
        let content = `${result.title}\n\n`;
        result.sections.forEach(s => {
            content += `${s.heading}\n${s.content}\n\n`;
        });
        content += `Summary: ${result.summary}`;
        navigator.clipboard.writeText(content);
    };

    return (
        <div className={styles.module}>
            <div className={styles.inputSection}>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>ML Topic</label>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="e.g., Linear Regression, Neural Networks, K-Means Clustering..."
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Depth Level</label>
                    <div className={styles.depthSelector}>
                        {(['brief', 'moderate', 'comprehensive'] as DepthLevel[]).map((d) => (
                            <button
                                key={d}
                                className={`${styles.depthBtn} ${depth === d ? styles.depthActive : ''}`}
                                onClick={() => setDepth(d)}
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
                            Generating...
                        </>
                    ) : (
                        <>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <path d="M9 2L11 7H16L12 10L13.5 15.5L9 12L4.5 15.5L6 10L2 7H7L9 2Z" fill="currentColor" />
                            </svg>
                            Generate Explanation
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
                        <div className={styles.resultActions}>
                            <button className={styles.actionBtn} onClick={copyToClipboard} title="Copy">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <rect x="5" y="5" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M3 11V3C3 2.44772 3.44772 2 4 2H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </button>
                            <button className={styles.actionBtn} onClick={downloadAsText} title="Download">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M8 2V10M8 10L5 7M8 10L11 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2 12V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {result.sections.map((section, i) => (
                        <div key={i} className={styles.expandableSection}>
                            <button
                                className={styles.sectionToggle}
                                onClick={() => toggleSection(i)}
                            >
                                <span className={`${styles.chevron} ${expandedSections.has(i) ? styles.chevronOpen : ''}`}>▶</span>
                                <h3>{section.heading}</h3>
                            </button>
                            {expandedSections.has(i) && (
                                <div className={styles.sectionContent}>
                                    {section.content.split('\n').map((line, j) => (
                                        <p key={j}>{line}</p>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    {result.summary && (
                        <div className={styles.summaryBox}>
                            <h3>📌 Summary</h3>
                            <p>
                                <TypingText text={result.summary} speed={20} />
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
