import { GeneratedTextContent, GeneratedCodeContent, GeneratedAudioContent, GeneratedVisualContent } from '@/types';

export const MOCK_TEXT_DATA: GeneratedTextContent = {
    title: "Introduction to Machine Learning (Demo Mode)",
    summary: "This is a demonstration response generated because the AI service is currently experiencing high traffic. Machine Learning is a subset of AI that enables systems to learn from data.",
    sections: [
        {
            heading: "What is Machine Learning?",
            content: "Machine Learning (ML) is the science of getting computers to act without being explicitly programmed. In the past decade, machine learning has given us self-driving cars, practical speech recognition, effective web search, and a vastly improved understanding of the human genome."
        },
        {
            heading: "Key Concepts",
            content: "Supervised Learning: The computer is presented with example inputs and their desired outputs, given by a 'teacher', and the goal is to learn a general rule that maps inputs to outputs.\n\nUnsupervised Learning: No labels are given to the learning algorithm, leaving it on its own to find structure in its input."
        },
        {
            heading: "Real-World Applications",
            content: "From recommendation engines on Netflix to fraud detection in banking, ML is everywhere. It powers the spam filters in your email and the voice recognition in your phone."
        }
    ]
};

export const MOCK_CODE_DATA: GeneratedCodeContent = {
    title: "Linear Regression Example (Demo Mode)",
    language: "python",
    code: `import numpy as np
from sklearn.linear_model import LinearRegression
import matplotlib.pyplot as plt

# 1. Prepare Data
X = np.array([[1], [2], [3], [4], [5]])
y = np.array([2, 4, 6, 8, 10])

# 2. Create Model
model = LinearRegression()
model.fit(X, y)

# 3. Make Predictions
X_new = np.array([[6], [7]])
predictions = model.predict(X_new)

print(f"Predictions for 6 and 7: {predictions}")
# Output: [12. 14.]

# 4. Visualize
plt.scatter(X, y, color='blue')
plt.plot(X, model.predict(X), color='red')
plt.title('Linear Regression Demo')
plt.show()`,
    dependencies: ["numpy", "scikit-learn", "matplotlib"],
    explanation: "This code demonstrates a simple Linear Regression model using scikit-learn. It predicts a linear relationship (y = 2x) from a small dataset.",
    executionInstructions: "Install dependencies using 'pip install numpy scikit-learn matplotlib' and run the script."
};

export const MOCK_AUDIO_DATA: GeneratedAudioContent = {
    title: "Neural Networks Explained (Demo Mode)",
    script: "Imagine a neural network like a team of detectives solving a mystery. Each layer of the network finds a small clue—colors, edges, shapes... (Pause) ...and passes it to the next layer. By the end, the final detective puts all the clues together to say: 'Aha! That's a cat!' This is how deep learning mimics the human brain's layered approach to understanding the world.",
    duration: "30 seconds"
};

export const MOCK_VISUAL_DATA: GeneratedVisualContent = {
    title: "Neural Network Architecture (Demo Mode)",
    descriptions: [
        {
            label: "Input Layer",
            description: "Where data enters the network. Each node represents a feature.",
            svgContent: `<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#0B0F14"/>
  <!-- Input Layer -->
  <circle cx="100" cy="100" r="20" fill="#00FF88" opacity="0.8"/>
  <circle cx="100" cy="200" r="20" fill="#00FF88" opacity="0.8"/>
  <circle cx="100" cy="300" r="20" fill="#00FF88" opacity="0.8"/>
  <text x="80" y="350" fill="#E6F1F0" font-family="sans-serif" font-size="14">Input Layer</text>

  <!-- Hidden Layer -->
  <circle cx="400" cy="150" r="20" fill="#00CC6A" opacity="0.6"/>
  <circle cx="400" cy="250" r="20" fill="#00CC6A" opacity="0.6"/>
  <text x="360" y="350" fill="#E6F1F0" font-family="sans-serif" font-size="14">Hidden Layer</text>

  <!-- Output Layer -->
  <circle cx="700" cy="200" r="20" fill="#00FF88" opacity="1"/>
  <text x="660" y="350" fill="#E6F1F0" font-family="sans-serif" font-size="14">Output Layer</text>

  <!-- Connections -->
  <line x1="120" y1="100" x2="380" y2="150" stroke="#00FF88" stroke-width="2" opacity="0.3"/>
  <line x1="120" y1="200" x2="380" y2="150" stroke="#00FF88" stroke-width="2" opacity="0.3"/>
  <line x1="120" y1="300" x2="380" y2="250" stroke="#00FF88" stroke-width="2" opacity="0.3"/>
  <line x1="380" y1="150" x2="680" y2="200" stroke="#00FF88" stroke-width="2" opacity="0.5"/>
  <line x1="380" y1="250" x2="680" y2="200" stroke="#00FF88" stroke-width="2" opacity="0.5"/>
</svg>`
        }
    ]
};
