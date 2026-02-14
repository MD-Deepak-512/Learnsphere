import subprocess
import time
import sys
import os

def run_servers():
    print("🚀 Starting LearnSphere Unified Platform...")
    
    # Check for GROQ_API_KEY
    if not os.environ.get("GROQ_API_KEY"):
        print("⚠️  Warning: GROQ_API_KEY not found in environment variables.")
        # Try to find a hardcoded key as fallback or prompt
        print("💡 Ensure you have your GROQ_API_KEY set in .env.local")

    # Start Streamlit
    print("📡 Starting Python AI Lab (Streamlit) on port 8501...")
    streamlit_proc = subprocess.Popen(["streamlit", "run", "app.py"], 
                                     stdout=subprocess.PIPE, 
                                     stderr=subprocess.STDOUT,
                                     text=True)

    # Start Next.js
    print("🌐 Starting Main Frontend (Next.js) on port 3000...")
    next_proc = subprocess.Popen(["npm", "run", "dev"], 
                                shell=True, # Needed for npm on windows
                                stdout=subprocess.PIPE, 
                                stderr=subprocess.STDOUT,
                                text=True)

    print("\n✅ Both servers are starting!")
    print("👉 Main App: http://localhost:3000")
    print("👉 Python Lab: http://localhost:8501")
    print("\nPress Ctrl+C to stop both servers.\n")

    try:
        while True:
            # Check if processes are still running
            if streamlit_proc.poll() is not None:
                print("❌ Streamlit process terminated.")
                break
            if next_proc.poll() is not None:
                print("❌ Next.js process terminated.")
                break
            time.sleep(1)
    except KeyboardInterrupt:
        print("\n🛑 Stopping servers...")
        streamlit_proc.terminate()
        next_proc.terminate()
        print("👋 Goodbye!")

if __name__ == "__main__":
    run_servers()
