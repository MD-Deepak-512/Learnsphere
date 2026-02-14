'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          {/* AI Orb */}
          <motion.div
            className={styles.orbContainer}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <div className={styles.orb}>
              <div className={styles.orbInner} />
              <div className={styles.orbRing1} />
              <div className={styles.orbRing2} />
              <div className={styles.orbRing3} />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Learn Machine Learning
            <br />
            <span className={styles.heroAccent}>with AI Intelligence</span>
          </motion.h1>

          <motion.p
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Multi-modal AI-powered learning platform that generates explanations, code,
            and visual diagrams — all personalized to your learning style.
          </motion.p>

          <motion.div
            className={styles.heroCTA}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link href="/learn" className={styles.btnPrimary}>
              Start Learning
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <a href="#features" className={styles.btnSecondary}>
              Explore Features
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className={styles.scrollIndicator}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className={styles.scrollDot} />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className={styles.features} id="features">
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>What <span className={styles.heroAccent}>LearnSphere</span> Does</h2>
            <p>Four powerful AI-driven learning modalities in one unified platform</p>
          </motion.div>

          <div className={styles.featureGrid}>
            {[
              {
                icon: '📝',
                title: 'Text Explanations',
                desc: 'Structured, clear explanations with definitions, mathematical intuition, step-by-step walkthroughs, and real-world use cases.',
                color: '#00FF88',
              },
              {
                icon: '💻',
                title: 'Code Generation',
                desc: 'Complete, executable ML code with inline comments, dependency lists, and execution instructions. Ready to run.',
                color: '#00CC6A',
              },
              {
                icon: '📊',
                title: 'Visual Diagrams',
                desc: 'Educational SVG diagrams and illustrations that bring ML architectures and concepts to life visually.',
                color: '#00FF88',
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                className={styles.featureCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Capabilities Section */}
      <section className={styles.capabilities}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>AI <span className={styles.heroAccent}>Capabilities</span></h2>
            <p>Powered by Groq LPU™ AI Inference Engine for instant content generation</p>
          </motion.div>

          <div className={styles.capList}>
            {[
              { label: 'Adaptive Depth', desc: 'Choose between Brief, Moderate, or Comprehensive explanations' },
              { label: 'Smart Context', desc: 'AI understands ML concepts and generates accurate, educational content' },
              { label: 'Multi-Format', desc: 'Same topic, multiple learning formats — text, code, and visual' },
              { label: 'Instant Generation', desc: 'Near real-time content generation with streaming responses' },
              { label: 'Download & Share', desc: 'Export all generated content as files for offline use' },
              { label: 'Error Handling', desc: 'Graceful error recovery with retry mechanisms' },
            ].map((cap, i) => (
              <motion.div
                key={cap.label}
                className={styles.capItem}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className={styles.capDot} />
                <div>
                  <h4>{cap.label}</h4>
                  <p>{cap.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <motion.div
            className={styles.ctaCard}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Ready to Transform Your ML Learning?</h2>
            <p>Start exploring Machine Learning concepts with AI-powered multi-modal learning</p>
            <Link href="/learn" className={styles.btnPrimary}>
              Launch AI Workspace
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerContent}>
            <div className={styles.footerBrand}>
              <span className={styles.heroAccent}>LearnSphere</span>
              <p>AI-Powered ML Learning Assistant</p>
            </div>
            <p className={styles.footerCopy}>
              © 2026 LearnSphere. Built with Next.js, Groq AI & Supabase.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
