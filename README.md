# Vi-Notes 🖋️

**Authenticity verification through keystroke dynamics and behavioral forensics.**

Vi-Notes is a premium writing platform designed to prove human authorship. By analyzing the unique "statistical signature" of your typing rhythm, it distinguishes genuine human composition from AI-generated or scripted text.

## 🚀 Vision
In an era of ubiquitous AI text, Vi-Notes restores trust in the written word. We verify *how* you write, not just *what* you write.

## ✨ Key Features
- **Privacy-First Monitoring**: Logs high-resolution timing data (`performance.now()`) without storing any raw character input.
- **Rhythm Analysis Engine**: Calculates dwell times and standard deviation to detect bot-like consistency.
- **Authenticity Dashboard**: A complete history of sessions with detailed "Human Confidence" report cards.
- **Real-time Feedback**: A live "Human Rhythm Index" meter that gives immediate behavioral feedback.
- **Premium Aesthetics**: A distraction-free, glassmorphism-inspired dark UI designed for professional writers.

## 🧠 Core Methodology
Human writing is naturally erratic and iterative. Vi-Notes captures:
- **Variable Typing Speeds**: Natural rhythm vs. robotic uniformity.
- **Dwell Time Analysis**: The micro-duration of internal key presses.
- **Anonymized Data**: We store timing pairs `{down, up}` ensuring your content remains 100% private.

## 🛠 Project Structure
```text
/Project
├── /frontend    # React + TypeScript + Vite
├── /backend     # Node.js + Express + MongoDB
├── /docs        # Implementation Plans & Walkthroughs
└── README.md
```

## 🛠 Tech Stack
- **Frontend**: React, TypeScript, Vite, lucide-react, jspdf.
- **Backend**: Node.js, Express, Mongoose.
- **Database**: MongoDB.

## 🎯 Getting Started

### 1. Requirements
- Node.js (v18+)
- MongoDB (Running locally on port 27017)

### 2. Setup
```bash
# Clone the repository
git clone https://github.com/susreepatro18/vi-notes.git
cd vi-notes

# Setup Backend
cd backend
npm install
node index.js

# Setup Frontend
cd ../frontend
npm install
npm run dev
```

---
*Developed with a focus on integrity, privacy, and user experience.*
