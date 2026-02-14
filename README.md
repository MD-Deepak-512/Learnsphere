# LearnSphere - AI Learning Assistant

An intelligent multi-modal learning platform for Machine Learning powered by **Groq LPU™** and Next.js.

## Features

- **📝 Text Explanations** – Structured, depth-adjustable ML concept explanations
- **💻 Code Generation** – Complete, executable Python ML code with syntax highlighting
- **📊 Visual Diagrams** – AI-generated SVG educational diagrams with lightbox view
- **🎨 3D User Interface** – Interactive neural network background with glassmorphism design

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Vanilla CSS
- **3D Graphics**: Three.js / React Three Fiber
- **Animations**: Framer Motion
- **AI Engine**: Groq LPU™ (Llama 3 70B)
- **Backend**: Supabase (PostgreSQL)

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Environment Variables

The app uses `GROQ_API_KEY` which is configured in `lib/ai/groq-client.ts`. 
You can also set it in `.env.local`:

```
GROQ_API_KEY=your_key_here
```

### Run the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)
