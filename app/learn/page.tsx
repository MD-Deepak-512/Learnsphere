'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TextExplanation from '@/components/modules/TextExplanation';
import CodeGeneration from '@/components/modules/CodeGeneration';
import VisualLearning from '@/components/modules/VisualLearning';
import styles from './learn.module.css';

type Modality = 'text' | 'code' | 'visual';

const modalities: { key: Modality; label: string; icon: string; desc: string }[] = [
    { key: 'text', label: 'Text Explanation', icon: '📝', desc: 'Structured explanations' },
    { key: 'code', label: 'Code Generation', icon: '💻', desc: 'Executable ML code' },
    { key: 'visual', label: 'Visual Learning', icon: '📊', desc: 'Diagrams & visuals' },
];

export default function LearnPage() {
    const [activeModality, setActiveModality] = useState<Modality>('text');

    return (
        <div className={styles.learnPage}>
            <div className={styles.container}>
                {/* Header */}
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1>AI <span className={styles.accent}>Workspace</span></h1>
                    <p>Select a learning modality and enter any ML topic to generate content</p>
                </motion.div>

                {/* Modality Selector */}
                <motion.div
                    className={styles.modalitySelector}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    {modalities.map((m) => (
                        <button
                            key={m.key}
                            className={`${styles.modalityBtn} ${activeModality === m.key ? styles.modalityActive : ''}`}
                            onClick={() => setActiveModality(m.key)}
                        >
                            <span className={styles.modalityIcon}>{m.icon}</span>
                            <span className={styles.modalityLabel}>{m.label}</span>
                            <span className={styles.modalityDesc}>{m.desc}</span>
                        </button>
                    ))}
                </motion.div>

                {/* Active Module */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeModality}
                        className={styles.moduleContainer}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {activeModality === 'text' && <TextExplanation />}
                        {activeModality === 'code' && <CodeGeneration />}
                        {activeModality === 'visual' && <VisualLearning />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
