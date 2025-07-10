
---

```markdown
# ⏱️ Timer App – HealthFlex Assignment

A fully functional **React + TypeScript** web application created for the **HealthFlex Assignment**. This app enables users to add, manage, and track multiple customizable timers with features like grouped categories, progress visualization, history tracking, and optional alerts — all built using modern React practices and Tailwind CSS.

---

## 🚀 Features

- ➕ Add timers with name, duration (hh:mm:ss), and category
- 🗂️ Group timers by category with expandable views
- ⏯️ Start, Pause, and Reset timers individually or in bulk
- 📊 Visual progress bar based on countdown percentage
- 📜 Timer history with timestamps upon completion
- 🔔 Custom alert at percentage thresholds (e.g., 50%)
- 🎯 Filter timers by category
- 📤 Export completed timers to downloadable `.json`

---

## 📁 Project Structure

```
timer-app/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── package-lock.json
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   ├── vite-env.d.ts
│   ├── types/
│   │   └── timer.ts
│   ├── context/
│   │   ├── ThemeContext.tsx
│   │   └── TimerContext.tsx
│   ├── components/
│   │   ├── CategorySection.tsx
│   │   ├── CompletionModal.tsx
│   │   ├── Layout.tsx
│   │   ├── ProgressBar.tsx
│   │   └── TimerItem.tsx
│   └── pages/
│       ├── Home.tsx
│       ├── AddTimer.tsx
│       └── History.tsx
```

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Vammshi2/timer-app.git
cd timer-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Application

```bash
npm run dev
```

The app will be available at `http://localhost:5173/`.

---

## 📌 Assumptions & Notes

- Timers use `Date.now()` for unique IDs.
- All state is persisted using `localStorage`.
- Visual alerts are handled in-app; no system-level notifications used.
- Timer countdown is implemented using `setInterval` with cleanup using `clearInterval`.
- Built with responsive UI using **Tailwind CSS** and **TypeScript** for type safety.

---

## 📤 Export Timer History

Navigate to the **History** page and click the **“Export”** button to download completed timer data as a `.json` file.

---

## 🧠 Tech Stack

- ⚛️ **React.js + TypeScript**
- 🧭 **React Router DOM**
- 🎨 **Tailwind CSS**
- 💾 **LocalStorage API**
- ⚙️ **Vite** (for fast builds)

---

## 📝 Developer Notes

- `useReducer` is used to manage the global timers state cleanly.
- `useEffect` and `useRef` are used for handling intervals.
- Components are cleanly modularized for reusability:
  - `TimerItem` – Each timer UI & logic
  - `ProgressBar` – Visual countdown
  - `CompletionModal` – Shown when a timer ends
  - `CategorySection` – Grouped timer view

---

## 📬 Contact

**Developed by:** Vamshikrishna Thogaru  
📧 Email: [t.vamshikrishna2@gmail.com](mailto:t.vamshikrishna2@gmail.com)  
🔗 GitHub: [github.com/Vammshi2](https://github.com/Vammshi2)

---
```

