import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { TimerProvider } from './context/TimerContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import AddTimer from './pages/AddTimer';
import History from './pages/History';

function App() {
  return (
    <ThemeProvider>
      <TimerProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<AddTimer />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </Layout>
        </Router>
      </TimerProvider>
    </ThemeProvider>
  );
}

export default App;