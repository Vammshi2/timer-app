import React, { useEffect, useRef, useState } from 'react';
import { Timer } from '../types/timer';
import { useTimer } from '../context/TimerContext';

interface TimerItemProps {
  timer: Timer;
}

const TimerItem: React.FC<TimerItemProps> = ({ timer }) => {
  const { dispatch, addToHistory } = useTimer();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [showCompleted, setShowCompleted] = useState(false);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    dispatch({
      type: 'UPDATE_TIMER',
      payload: { id: timer.id, updates: { status: 'running' } }
    });
  };

  const handlePause = () => {
    dispatch({
      type: 'UPDATE_TIMER',
      payload: { id: timer.id, updates: { status: 'paused' } }
    });
  };

  const handleReset = () => {
    dispatch({
      type: 'UPDATE_TIMER',
      payload: { 
        id: timer.id, 
        updates: { 
          status: 'paused', 
          remainingTime: timer.duration
        } 
      }
    });
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this timer?')) {
      dispatch({ type: 'DELETE_TIMER', payload: timer.id });
    }
  };

  const handleComplete = () => {
    dispatch({
      type: 'UPDATE_TIMER',
      payload: { 
        id: timer.id, 
        updates: { 
          status: 'completed',
          completedAt: new Date()
        } 
      }
    });
    addToHistory(timer);
    setShowCompleted(true);
  };

  // Timer countdown effect
  useEffect(() => {
    if (timer.status === 'running' && timer.remainingTime > 0) {
      intervalRef.current = setInterval(() => {
        dispatch({
          type: 'UPDATE_TIMER',
          payload: { 
            id: timer.id, 
            updates: { remainingTime: Math.max(0, timer.remainingTime - 1) }
          }
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timer.status, timer.remainingTime, timer.id, dispatch]);

  // Handle timer completion
  useEffect(() => {
    if (timer.remainingTime === 0 && timer.status === 'running') {
      handleComplete();
    }
  }, [timer.remainingTime, timer.status]);

  const progressPercentage = ((timer.duration - timer.remainingTime) / timer.duration) * 100;

  return (
    <>
      <div style={{ 
        border: '1px solid #ddd', 
        padding: '15px', 
        marginBottom: '15px',
        backgroundColor: timer.status === 'running' ? '#f0f8ff' : '#fff'
      }}>
        <div style={{ marginBottom: '10px' }}>
          <h3 style={{ margin: '0 0 5px 0' }}>{timer.name}</h3>
          <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
            Category: {timer.category}
          </p>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '5px' }}>
            {formatTime(timer.remainingTime)}
          </div>
          <div style={{ 
            width: '100%', 
            height: '10px', 
            backgroundColor: '#eee',
            border: '1px solid #ccc'
          }}>
            <div style={{ 
              width: `${progressPercentage}%`, 
              height: '100%', 
              backgroundColor: '#4CAF50'
            }}></div>
          </div>
          <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
            {Math.round(progressPercentage)}% complete
          </div>
        </div>

        <div>
          {timer.status === 'running' ? (
            <button onClick={handlePause} style={{ marginRight: '10px' }}>
              Pause
            </button>
          ) : (
            <button 
              onClick={handleStart} 
              disabled={timer.remainingTime === 0}
              style={{ marginRight: '10px' }}
            >
              Start
            </button>
          )}
          
          <button onClick={handleReset} style={{ marginRight: '10px' }}>
            Reset
          </button>
          
          <button onClick={handleDelete} style={{ color: 'red' }}>
            Delete
          </button>
        </div>
      </div>

      {showCompleted && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            border: '1px solid #ccc',
            textAlign: 'center',
            maxWidth: '400px'
          }}>
            <h2>Timer Completed!</h2>
            <p>Great job! You completed "{timer.name}"</p>
            <button onClick={() => setShowCompleted(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TimerItem;