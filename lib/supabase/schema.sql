-- LearnSphere Database Schema
-- Run this in the Supabase SQL Editor to set up tables

-- Learning Sessions Table
CREATE TABLE IF NOT EXISTS learning_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  topic TEXT NOT NULL,
  modality TEXT NOT NULL CHECK (modality IN ('text', 'code', 'audio', 'visual')),
  depth TEXT NOT NULL DEFAULT 'moderate',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE learning_sessions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts and reads (since we're using anon key)
CREATE POLICY "Allow anonymous insert" ON learning_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous select" ON learning_sessions FOR SELECT USING (true);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_sessions_created ON learning_sessions(created_at DESC);

-- Generated Content Cache (optional, for performance)
CREATE TABLE IF NOT EXISTS generated_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  topic TEXT NOT NULL,
  modality TEXT NOT NULL,
  depth TEXT NOT NULL DEFAULT 'moderate',
  content JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE generated_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anonymous insert content" ON generated_content FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous select content" ON generated_content FOR SELECT USING (true);

CREATE INDEX IF NOT EXISTS idx_content_topic ON generated_content(topic, modality, depth);
