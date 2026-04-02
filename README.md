<h1 align="center">🚀 NegotiateX</h1>
<h3 align="center">AI-Powered Real-Time Negotiation Simulator</h3>

<p align="center">
  <em>Can you outsmart an AI in a real-time negotiation?</em> 🤖💰
</p>

<p align="center">
  <a href="https://negotiate-x-frontend.onrender.com">🌐 Live Demo</a> •
  <a href="https://github.com/noisyboy-623/Negotiate_X">💻 GitHub</a>
</p>

<p align="center"> 
  <img src="https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge" /> 
  <img src="https://img.shields.io/badge/Styling-TailwindCSS-38B2AC?style=for-the-badge" /> 
  <img src="https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge" /> 
  <img src="https://img.shields.io/badge/Framework-Express-black?style=for-the-badge" /> 
  <img src="https://img.shields.io/badge/Database-MongoDB-darkgreen?style=for-the-badge" /> 
  <img src="https://img.shields.io/badge/Realtime-Socket.io-black?style=for-the-badge" /> 
  <img src="https://img.shields.io/badge/Auth-JWT-orange?style=for-the-badge" /> 
  <img src="https://img.shields.io/badge/Security-Redis-red?style=for-the-badge" /> 
  <img src="https://img.shields.io/badge/Email-Nodemailer-yellow?style=for-the-badge" /> 
  <img src="https://img.shields.io/badge/AI-LangChain-purple?style=for-the-badge" /> 
  <img src="https://img.shields.io/badge/AI-Mistral-blueviolet?style=for-the-badge" /> 
  <img src="https://img.shields.io/badge/Status-Active_Development-brightgreen?style=for-the-badge" />
</p>

---

## ✨ Overview

**NegotiateX** is a full-stack application that simulates real-world negotiation scenarios using **AI-driven seller agents**.

💡 Instead of a simple chatbot, this project focuses on:
- Strategy  
- Real-time interaction  
- Decision-making under constraints  

---

## 🎯 Features

### 🤖 AI Negotiation Engine
- Multiple personalities: *Friendly, Greedy, Balanced*  
- Behavior adapts to user negotiation style  
- Designed to be **realistic and resistant**  

---

### 💬 Real-Time Communication
- Powered by **Socket.io**  
- Instant negotiation flow  

---

### 🔁 Structured Negotiation System
- Maximum **5 rounds per session**  
- User can:
  - Continue negotiating  
  - Accept deal anytime  

---

### 🏆 Leaderboard
- Tracks performance  
- Encourages competitive gameplay  

---

### 🔐 Authentication & Security
- Email verification using **Nodemailer**  
- JWT stored in **HTTP-only cookies**  
- **Redis-based token blacklisting**  

---

## 🔄 Application Flow

```mermaid
graph TD
A[User Registers] --> B[Email Verification]
B --> C[Login]
C --> D[Select Product]
D --> E[Choose AI Agent]
E --> F[Start Negotiation]
F --> G{Rounds <= 5?}
G -->|Yes| F
G -->|Accept Deal| H[End Negotiation]
H --> I[Score + Leaderboard]

🛠️ Tech Stack
Layer:	Technology
Frontend:	React, Tailwind CSS
Backend:	Node.js, Express
Database:	MongoDB
Real-Time:	Socket.io
AI:	LangChain, Google GenAI, Mistral
Auth:	JWT, Cookies
Security:	Redis, Nodemailer

⚡ Challenges & Learnings
Handling CORS + cookies across environments
Managing secure session-based authentication
Building real-time systems with WebSockets
Designing non-trivial AI behavior

🤖 AI Behavior

The AI is intentionally designed to be:

❗ Resistant and realistic — it won’t easily reduce prices

🙌 Acknowledgement

Built as part of
Sheriyans Coding School — Cohort 2.0

Special thanks to
👉 [Ankur Prajapati](https://github.com/ankurdotio) for backend guidance

👨‍💻 Author

Tejas H Shekhar

⭐ Support

If you liked this project:
⭐ Star the repo
🍴 Fork it
💬 Share feedback
<p align="center"> <b>🚀 Building. Learning. Improving — every single day.</b> </p> ```
