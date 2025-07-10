
---

```markdown
# ⏱️ Timer App – HealthFlex Assignment

A fully functional **React.js** web application that enables users to create, manage, and track multiple customizable timers. Designed as part of the **HealthFlex Company Assignment**, this app includes grouped timers, visual countdowns, history tracking, and more—built with modern web development best practices.

---

## 🚀 Key Features

- 🔧 Add timers with a name, duration, and category.
- 📂 Group timers by category for better organization.
- ⏯️ Individual controls: Start, Pause, and Reset for each timer.
- 📉 Real-time progress visualization using a dynamic progress bar.
- 📜 Timer history log with completion timestamps.
- 🔔 Optional alerts at custom thresholds (e.g., 50% completed).
- 🎯 Filter timers by category.
- 📥 Export timer history as a downloadable JSON file.

---

## 📁 Project Structure

```

timer-app/
├── public/
├── src/
│   ├── components/
│   │   ├── TimerItem.js
│   │   ├── TimerItem.module.css
│   │   ├── ProgressBar.js
│   │   ├── CompletionModal.js
│   │   └── CategorySection.js
│   ├── pages/
│   │   ├── HomePage.js
│   │   ├── AddTimerPage.js
│   │   └── HistoryPage.js
│   ├── styles/
│   │   └── global.css
│   ├── App.js
│   └── index.js
├── package.json
└── README.md

````

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Vammshi2/timer-app.git
cd timer-app
````

### 2. Install Dependencies

#### For Vite (Recommended):

```bash
npm install
npm run dev
```

---

## 📌 Assumptions

* Timer IDs are generated using `Date.now()`, assuming no duplicate creation in the same millisecond.
* App data is stored in `localStorage`, ideal for small to mid-scale use cases.
* Alert system uses in-app visual messages, not system-level notifications.
* Timer countdown is handled using `setInterval` within `useEffect`, with cleanup via `clearInterval` to avoid memory leaks.
* UI is responsive and user-friendly across devices.

---

## 🧠 Tech Stack

* **React.js** – Frontend framework
* **React Router DOM** – Client-side routing
* **CSS Modules** / **Styled Components** – Component-scoped styling
* **LocalStorage API** – Persistent storage in the browser
* **Vite** or **Create React App** – Development tooling

---

## 📤 Exporting Timer History

Navigate to the **History** page and click the **"Export"** button to download completed timer data as a `JSON` file.

---

## 📝 Developer Notes

* Use `useReducer` for managing complex timer state updates.
* Use `useRef` to track interval IDs for each timer.
* Timers auto-update every second using `setInterval`, and cleanup is handled properly via `useEffect`.
* Components like `TimerItem`, `ProgressBar`, and `Modal` are decoupled for reusability and clarity.

---

## 📬 Contact

Developed by **Vamshikrishna**
📧 Email: *[t.vamshikrishna2@gmail.com](mailto:t.vamshikrishna2@gmail.com)*
🔗 GitHub: [github.com/Vammshi2](https://github.com/Vammshi2)

