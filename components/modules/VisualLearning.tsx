'use client';

import React, { useState } from 'react';
import { GeneratedVisualContent } from '@/types';
import styles from './modules.module.css';

export default function VisualLearning() {
    const [topic, setTopic] = useState('');
    const [result, setResult] = useState<GeneratedVisualContent | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const handleGenerate = async () => {
        if (!topic.trim()) return;
        setLoading(true);
        setError('');
        setResult(null);

        try {
            const res = await fetch('/api/generate/visual', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic: topic.trim() }),
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

    const downloadSVG = (svgContent: string, label: string) => {
        const blob = new Blob([svgContent], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${label.replace(/\s+/g, '_')}.svg`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className={styles.module}>
            <div className={styles.inputSection}>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>ML Concept</label>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="e.g., Decision Trees, Backpropagation, CNN Architecture..."
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                    />
                </div>

                <button
                    className={styles.generateBtn}
                    onClick={handleGenerate}
                    disabled={loading || !topic.trim()}
                >
                    {loading ? (
                        <>
                            <span className={styles.spinner} />
                            Generating Visuals...
                        </>
                    ) : (
                        <>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <rect x="2" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2" />
                                <rect x="10" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2" />
                                <rect x="2" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2" />
                                <rect x="10" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2" />
                            </svg>
                            Generate Diagrams
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

                    <div className={styles.visualGrid}>
                        {result.descriptions.map((item, i) => (
                            <div key={i} className={styles.visualCard}>
                                <div className={styles.visualLabel}>{item.label}</div>
                                <div
                                    className={styles.svgContainer}
                                    onClick={() => setLightboxIndex(i)}
                                    dangerouslySetInnerHTML={{ __html: item.svgContent }}
                                />
                                <p className={styles.visualDesc}>{item.description}</p>
                                <button
                                    className={styles.downloadSmall}
                                    onClick={() => downloadSVG(item.svgContent, item.label)}
                                >
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <path d="M7 1V9M7 9L4 6M7 9L10 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M1 11V12C1 12.5523 1.44772 13 2 13H12C12.5523 13 13 12.5523 13 12V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                    Download SVG
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Lightbox */}
            {lightboxIndex !== null && result && (
                <div className={styles.lightbox} onClick={() => setLightboxIndex(null)}>
                    <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.lightboxClose} onClick={() => setLightboxIndex(null)}>✕</button>
                        <h3>{result.descriptions[lightboxIndex].label}</h3>
                        <div
                            className={styles.lightboxSvg}
                            dangerouslySetInnerHTML={{ __html: result.descriptions[lightboxIndex].svgContent }}
                        />
                        <p>{result.descriptions[lightboxIndex].description}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
