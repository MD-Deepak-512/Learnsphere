'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { AudioLength, GeneratedAudioContent } from '@/types';
import styles from './modules.module.css';

export default function AudioLearning() {
    const [topic, setTopic] = useState('');
    const [length, setLength] = useState<AudioLength>('brief');
    const [result, setResult] = useState<GeneratedAudioContent | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [waveformBars] = useState(() => Array.from({ length: 40 }, () => Math.random()));
    const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const handleGenerate = async () => {
        if (!topic.trim()) return;
        setLoading(true);
        setError('');
        setResult(null);
        setIsPlaying(false);
        setProgress(0);
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
        }

        try {
            const res = await fetch('/api/generate/audio', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic: topic.trim(), length }),
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

    const stopPlayback = useCallback(() => {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        setProgress(0);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    }, []);

    const togglePlay = useCallback(() => {
        if (!result) return;

        if (isPlaying) {
            stopPlayback();
            return;
        }

        const utterance = new SpeechSynthesisUtterance(result.script);
        utterance.rate = 0.9;
        utterance.pitch = 1;

        // Estimate duration (roughly 150 words per minute at 0.9 rate)
        const wordCount = result.script.split(/\s+/).length;
        const estimatedDuration = (wordCount / 135) * 60 * 1000; // in ms

        const startTime = Date.now();
        intervalRef.current = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const p = Math.min((elapsed / estimatedDuration) * 100, 100);
            setProgress(p);
        }, 100);

        utterance.onend = () => {
            setIsPlaying(false);
            setProgress(100);
            if (intervalRef.current) clearInterval(intervalRef.current);
        };

        utterance.onerror = () => {
            setIsPlaying(false);
            if (intervalRef.current) clearInterval(intervalRef.current);
        };

        speechRef.current = utterance;
        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
    }, [result, isPlaying, stopPlayback]);

    useEffect(() => {
        return () => {
            if (window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
            }
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    const downloadScript = () => {
        if (!result) return;
        const blob = new Blob([result.script], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${result.title.replace(/\s+/g, '_')}_script.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className={styles.module}>
            <div className={styles.inputSection}>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>ML Topic</label>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="e.g., Neural Networks, Gradient Descent, Transformers..."
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Lesson Length</label>
                    <div className={styles.depthSelector}>
                        {(['brief', 'detailed'] as AudioLength[]).map((l) => (
                            <button
                                key={l}
                                className={`${styles.depthBtn} ${length === l ? styles.depthActive : ''}`}
                                onClick={() => setLength(l)}
                            >
                                {l.charAt(0).toUpperCase() + l.slice(1)}
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
                            Generating Audio...
                        </>
                    ) : (
                        <>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="2" />
                                <path d="M7 6L12 9L7 12V6Z" fill="currentColor" />
                            </svg>
                            Generate Audio Lesson
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
                        <span className={styles.durationBadge}>⏱ {result.duration}</span>
                    </div>

                    {/* Audio Player */}
                    <div className={styles.audioPlayer}>
                        <button
                            className={styles.playBtn}
                            onClick={togglePlay}
                        >
                            {isPlaying ? (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
                                    <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
                                </svg>
                            ) : (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M8 5L19 12L8 19V5Z" fill="currentColor" />
                                </svg>
                            )}
                            <div className={styles.playRing} />
                        </button>

                        {/* Waveform */}
                        <div className={styles.waveform}>
                            {waveformBars.map((h, i) => (
                                <div
                                    key={i}
                                    className={`${styles.waveBar} ${isPlaying ? styles.waveBarActive : ''}`}
                                    style={{
                                        height: `${h * 100}%`,
                                        animationDelay: `${i * 0.05}s`,
                                        opacity: (i / waveformBars.length) * 100 <= progress ? 1 : 0.3,
                                    }}
                                />
                            ))}
                        </div>

                        {/* Progress Bar */}
                        <div className={styles.progressBar}>
                            <div
                                className={styles.progressFill}
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    {/* Script */}
                    <div className={styles.scriptBox}>
                        <div className={styles.scriptHeader}>
                            <h3>📜 Lesson Script</h3>
                            <button className={styles.actionBtn} onClick={downloadScript} title="Download Script">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M8 2V10M8 10L5 7M8 10L11 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2 12V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </button>
                        </div>
                        <div className={styles.scriptContent}>
                            {result.script.split('\n').map((line, i) => (
                                <p key={i}>{line}</p>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
