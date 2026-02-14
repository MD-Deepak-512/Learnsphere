'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from './ThemeProvider';
import styles from './Navbar.module.css';

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className={styles.navbar}>
            <div className={styles.navContent}>
                <Link href="/" className={styles.logo}>
                    <div className={styles.logoIcon}>
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                            <circle cx="14" cy="14" r="12" stroke="#00FF88" strokeWidth="2" fill="none" />
                            <circle cx="14" cy="14" r="6" fill="#00FF88" opacity="0.3" />
                            <circle cx="14" cy="14" r="3" fill="#00FF88" />
                            <line x1="14" y1="2" x2="14" y2="8" stroke="#00FF88" strokeWidth="1.5" opacity="0.5" />
                            <line x1="14" y1="20" x2="14" y2="26" stroke="#00FF88" strokeWidth="1.5" opacity="0.5" />
                            <line x1="2" y1="14" x2="8" y2="14" stroke="#00FF88" strokeWidth="1.5" opacity="0.5" />
                            <line x1="20" y1="14" x2="26" y2="14" stroke="#00FF88" strokeWidth="1.5" opacity="0.5" />
                        </svg>
                    </div>
                    <span className={styles.logoText}>LearnSphere</span>
                </Link>

                <div className={styles.navLinks}>
                    <Link href="/" className={styles.navLink}>Home</Link>
                    <Link href="/learn" className={styles.navLink}>AI Workspace</Link>
                    <a href="http://localhost:8501" target="_blank" rel="noopener noreferrer" className={styles.navLink}>
                        Python AI Lab 🧪
                    </a>
                </div>

                <div className={styles.navActions}>
                    <button
                        className={styles.themeToggle}
                        onClick={toggleTheme}
                        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                    >
                        {theme === 'dark' ? (
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <circle cx="10" cy="10" r="4" fill="#00FF88" />
                                <g stroke="#00FF88" strokeWidth="1.5" strokeLinecap="round">
                                    <line x1="10" y1="1" x2="10" y2="3" />
                                    <line x1="10" y1="17" x2="10" y2="19" />
                                    <line x1="1" y1="10" x2="3" y2="10" />
                                    <line x1="17" y1="10" x2="19" y2="10" />
                                    <line x1="3.6" y1="3.6" x2="5" y2="5" />
                                    <line x1="15" y1="15" x2="16.4" y2="16.4" />
                                    <line x1="3.6" y1="16.4" x2="5" y2="15" />
                                    <line x1="15" y1="5" x2="16.4" y2="3.6" />
                                </g>
                            </svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M17.5 10.5C17.5 14.9183 13.9183 18.5 9.5 18.5C5.08172 18.5 1.5 14.9183 1.5 10.5C1.5 6.08172 5.08172 2.5 9.5 2.5C9.5 2.5 7.5 5.5 9.5 8.5C11.5 11.5 14.5 10.5 14.5 10.5C14.5 10.5 17.5 8.5 17.5 10.5Z" fill="#00CC6A" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
}
