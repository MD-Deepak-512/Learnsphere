import streamlit as st
import os
from groq import Groq
import json

# Set page config
st.set_page_config(
    page_title="LearnSphere - AI Learning Assistant",
    page_icon="🤖",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Initialize Groq client
# Use secrets if available, otherwise environment variable
api_key = os.environ.get("GROQ_API_KEY") or "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"
client = Groq(api_key=api_key)

# Custom CSS for styling
st.markdown("""
<style>
    .stApp {
        background-color: #0e1117;
        color: #e0e0e0;
    }
    .stButton>button {
        background-color: #00FF88;
        color: #0e1117;
        border: none;
        border-radius: 4px;
        font-weight: bold;
    }
    .stButton>button:hover {
        background-color: #00CC6A;
        color: #ffffff;
    }
    h1, h2, h3 {
        color: #00FF88 !important;
    }
    .stTextInput>div>div>input {
        background-color: #262730;
        color: white;
    }
    .reportview-container .main .block-container {
        padding-top: 2rem;
    }
</style>
""", unsafe_allow_html=True)

# Helper function for Groq generation
def generate_content(prompt, model="llama-3.3-70b-versatile"):
    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            model=model,
            temperature=0.7,
            max_tokens=8000,
        )
        return chat_completion.choices[0].message.content
    except Exception as e:
        return f"Error generation content: {str(e)}"

# Sidebar Navigation
with st.sidebar:
    st.image("https://img.icons8.com/fluency/96/artificial-intelligence.png", width=64)
    st.title("LearnSphere")
    st.markdown("### AI-Powered Learning")
    
    modality = st.radio(
        "Choose Learning Mode:",
        ["📝 Text Explanation", "💻 Code Generation", "📊 Visual Learning"],
        index=0
    )
    
    st.divider()
    st.markdown("### Interconnection")
    st.markdown("[← Go to Main Dashboard](http://localhost:3000)")
    
    st.divider()
    st.markdown("Powered by **Groq LPU™**")
    st.caption("v1.0.0 Production Ready")

# Main Content Area
st.title("AI Workspace")
st.markdown("Select a learning modality and enter any ML topic to generate content.")

# Input Area
topic = st.text_input("Enter a Machine Learning Topic:", placeholder="e.g., Neural Networks, Gradient Descent...")

if modality == "📝 Text Explanation":
    depth = st.select_slider("Explanation Depth:", options=["Brief", "Moderate", "Comprehensive"], value="Moderate")
    
    if st.button("Generate Explanation") and topic:
        with st.spinner("Generating explanation with Groq AI..."):
            prompt = f"""You are an expert ML educator. Explain "{topic}" to a student.
            Depth: {depth}.
            
            Structure your response with:
            1. Title
            2. Definition & Core Concept
            3. Key Components/Math
            4. Real-world Example
            5. Summary
            
            Format nicely with Markdown."""
            
            response = generate_content(prompt)
            st.markdown(response)

elif modality == "💻 Code Generation":
    complexity = st.select_slider("Code Complexity:", options=["Simple", "Moderate", "Advanced"], value="Moderate")
    
    if st.button("Generate Code") and topic:
        with st.spinner("Writing Python code..."):
            prompt = f"""You are an expert ML engineer. Write a complete, executable Python code example for "{topic}".
            Complexity: {complexity}.
            
            Include:
            - Imports (numpy, sklearn, etc.)
            - Synthetic data generation
            - Model implementation
            - Visualization code
            - Comments explaining each step
            
            Return ONLY the code block wrapped in python markdown."""
            
            response = generate_content(prompt)
            st.markdown(response)

elif modality == "📊 Visual Learning":
    if st.button("Generate Visual Concept") and topic:
        with st.spinner("Designing visual concept..."):
            prompt = f"""You are a visual learning expert. Describe a mental model or diagram to visualize "{topic}".
            
            1. Describe the visual metaphor (e.g., "Think of a Neural Network as a series of sieves...")
            2. Break down the components visually
            3. Explain the flow of data
            
            Then, provide Mermaid JS code to render a flowchart or diagram for this concept.
            Wrap the mermaid code in a mermaid code block."""
            
            response = generate_content(prompt)
            st.markdown(response)
            
            # Extract mermaid code if present
            if "```mermaid" in response:
                try:
                    mermaid_code = response.split("```mermaid")[1].split("```")[0]
                    st.image(f"https://mermaid.ink/img/{mermaid_code.encode('ascii').hex()}", caption="Visual Diagram")
                except:
                    st.warning("Could not render diagram directly, but here is the description:")
            
