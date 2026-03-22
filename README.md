# PlanPulse 🚀 - Your Personal Growth Engine

**PlanPulse** is more than just a task manager; it's a comprehensive personal productivity and growth ecosystem designed to help you set, track, and achieve your life's biggest objectives.

[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)](https://vuejs.org/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini%20AI-8E75C2?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

---

## 🌟 Premium Features

### 🎯 Goal Management & Milestones
Set long-term objectives and break them down into actionable milestones. Categorize your goals (Work, Health, Learning...) and track progress in real-time.

### ⚡ Habit Tracking & Streaks
Establish positive daily/weekly routines. Keep your momentum high with a visual streak counter and a history of your consistency.

### 📝 Mindful Journaling
Reflect on your journey with a dedicated mood journal. Create custom moods with a built-in emoji picker and track your emotional well-being over time.

### 🤖 AI Goal Coach (powered by Gemini)
Get personalized feedback, motivation, and strategies directly from an AI coach. Your data is analyzed to give you the best advice for achieving your specific goals.

### 📊 Advanced Analytics & Productivity Score
Visualize your performance through interactive charts. The **Productivity Score** (40% Goals / 60% Habits) gives you a single, powerful metric of your daily success.

### 🔔 Smart Push Notifications
Receive intelligent alerts at the right time:
*   **Morning Planning:** Reminders for your daily habits.
*   **Evening Check:** A final push for unfinished tasks.
*   **Celebration:** Instant feedback when you hit your daily targets.

### 🔒 Secure Auth & Profile Customization
*   **Email & Google Login** via Supabase.
*   **Two-Step Password Verification** for ultimate security.
*   **Personalized Profiles:** Custom avatars (URL or Local Upload) and Short Bio to define your identity.

---

## 🎨 Design Aesthetic
PlanPulse features a **state-of-the-art premium design**:
*   **Premium Gradients**: Indigo-to-Purple transitions for major actions.
*   **Glassmorphism & Micro-animations**: A fluid, responsive UI that feels alive.
*   **Dark Mode Support**: Seamless transition between light and dark themes.

---

## 🛠️ Technology Stack

*   **Core**: Vue.js 3 (Composition API)
*   **Styling**: Tailwind CSS
*   **Backend**: Supabase (Auth, DB, Storage)
*   **State**: Pinia
*   **AI**: Google Gemini Pro 1.5
*   **Charts**: Chart.js

---

## 🚀 Getting Started

### Prerequisites
*   Node.js (v20+ or latest LTS)
*   npm

### Installation

1.  Clone the repository:
    ```sh
    git clone https://github.com/trungka982004/plan-pulse.git
    cd plan-pulse
    ```

2.  Install dependencies:
    ```sh
    npm install
    ```

3.  Configure environment:
    *   Create a `.env` file from the provided setup.
    *   Add your `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, and `VITE_GEMINI_API_KEY`.

4.  Setup Database:
    *   Run the provided `docs/SUPABASE_SCHEMA.sql` in your Supabase SQL Editor.

### Development
```sh
npm run dev
```

---

## 🔗 Live Demo
Check it out at: **[trung-todo.vercel.app](https://trung-todo.vercel.app/)** 🌐

---

## 📄 License
This project is licensed under the MIT License.