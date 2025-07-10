import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Timer, TimerAction, TimerHistory } from '../types/timer';

interface TimerContextType {
  timers: Timer[];
  history: TimerHistory[];
  dispatch: React.Dispatch<TimerAction>;
  addToHistory: (timer: Timer) => void;
  exportHistory: () => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

const timerReducer = (state: Timer[], action: TimerAction): Timer[] => {
  switch (action.type) {
    case 'ADD_TIMER':
      return [...state, action.payload];
    
    case 'UPDATE_TIMER':
      return state.map(timer =>
        timer.id === action.payload.id
          ? { ...timer, ...action.payload.updates }
          : timer
      );
    
    case 'DELETE_TIMER':
      return state.filter(timer => timer.id !== action.payload);
    
    case 'LOAD_TIMERS':
      return action.payload;
    
    case 'BULK_ACTION':
      return state.map(timer => {
        if (timer.category === action.payload.category) {
          switch (action.payload.action) {
            case 'start':
              return { ...timer, status: 'running' as const };
            case 'pause':
              return { ...timer, status: 'paused' as const };
            case 'reset':
              return { 
                ...timer, 
                status: 'paused' as const, 
                remainingTime: timer.duration,
                alertTriggered: false
              };
            default:
              return timer;
          }
        }
        return timer;
      });
    
    default:
      return state;
  }
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [timers, dispatch] = useReducer(timerReducer, []);
  const [history, setHistory] = React.useState<TimerHistory[]>([]);

  // Load timers from localStorage on mount
  useEffect(() => {
    const savedTimers = localStorage.getItem('timers');
    const savedHistory = localStorage.getItem('timerHistory');
    
    if (savedTimers) {
      const parsedTimers = JSON.parse(savedTimers).map((timer: any) => ({
        ...timer,
        createdAt: new Date(timer.createdAt),
        completedAt: timer.completedAt ? new Date(timer.completedAt) : undefined
      }));
      dispatch({ type: 'LOAD_TIMERS', payload: parsedTimers });
    }
    
    if (savedHistory) {
      const parsedHistory = JSON.parse(savedHistory).map((item: any) => ({
        ...item,
        completedAt: new Date(item.completedAt)
      }));
      setHistory(parsedHistory);
    }
  }, []);

  // Save timers to localStorage whenever timers change
  useEffect(() => {
    localStorage.setItem('timers', JSON.stringify(timers));
  }, [timers]);

  // Save history to localStorage whenever history changes
  useEffect(() => {
    localStorage.setItem('timerHistory', JSON.stringify(history));
  }, [history]);

  const addToHistory = (timer: Timer) => {
    const historyEntry: TimerHistory = {
      id: timer.id,
      name: timer.name,
      category: timer.category,
      duration: timer.duration,
      completedAt: new Date()
    };
    setHistory(prev => [historyEntry, ...prev]);
  };

  const exportHistory = () => {
    const dataStr = JSON.stringify(history, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `timer_history_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <TimerContext.Provider value={{
      timers,
      history,
      dispatch,
      addToHistory,
      exportHistory
    }}>
      {children}
    </TimerContext.Provider>
  );
};