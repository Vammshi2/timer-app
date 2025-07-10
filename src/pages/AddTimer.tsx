import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTimer } from '../context/TimerContext';
import { Timer } from '../types/timer';

const AddTimer: React.FC = () => {
  const navigate = useNavigate();
  const { dispatch } = useTimer();
  const [formData, setFormData] = useState({
    name: '',
    hours: 0,
    minutes: 25,
    seconds: 0,
    category: 'work'
  });

  const categories = [
    'work',
    'study', 
    'exercise',
    'break',
    'meditation',
    'cooking',
    'personal',
    'other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const totalSeconds = formData.hours * 3600 + formData.minutes * 60 + formData.seconds;
    
    if (totalSeconds === 0) {
      alert('Please set a duration greater than 0 seconds');
      return;
    }

    if (!formData.name.trim()) {
      alert('Please enter a timer name');
      return;
    }

    const newTimer: Timer = {
      id: Date.now().toString(),
      name: formData.name.trim(),
      duration: totalSeconds,
      remainingTime: totalSeconds,
      category: formData.category,
      status: 'paused',
      createdAt: new Date()
    };

    dispatch({ type: 'ADD_TIMER', payload: newTimer });
    navigate('/');
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const totalSeconds = formData.hours * 3600 + formData.minutes * 60 + formData.seconds;

  return (
    <div style={{ maxWidth: '500px' }}>
      <h1>Add New Timer</h1>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Timer Name:
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter timer name"
            style={{ 
              width: '100%', 
              padding: '8px', 
              fontSize: '16px',
              border: '1px solid #ccc'
            }}
            required
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px' }}>
            Duration:
          </label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px' }}>Hours</label>
              <input
                type="number"
                min="0"
                max="23"
                value={formData.hours}
                onChange={(e) => handleInputChange('hours', parseInt(e.target.value) || 0)}
                style={{ width: '60px', padding: '5px', textAlign: 'center' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px' }}>Minutes</label>
              <input
                type="number"
                min="0"
                max="59"
                value={formData.minutes}
                onChange={(e) => handleInputChange('minutes', parseInt(e.target.value) || 0)}
                style={{ width: '60px', padding: '5px', textAlign: 'center' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px' }}>Seconds</label>
              <input
                type="number"
                min="0"
                max="59"
                value={formData.seconds}
                onChange={(e) => handleInputChange('seconds', parseInt(e.target.value) || 0)}
                style={{ width: '60px', padding: '5px', textAlign: 'center' }}
              />
            </div>
          </div>
          {totalSeconds > 0 && (
            <p style={{ marginTop: '10px', color: '#666' }}>
              Total: {Math.floor(totalSeconds / 3600) > 0 && `${Math.floor(totalSeconds / 3600)}h `}
              {Math.floor((totalSeconds % 3600) / 60) > 0 && `${Math.floor((totalSeconds % 3600) / 60)}m `}
              {totalSeconds % 60 > 0 && `${totalSeconds % 60}s`}
            </p>
          )}
        </div>

        <div style={{ marginBottom: '30px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Category:
          </label>
          <select
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            style={{ 
              width: '100%', 
              padding: '8px', 
              fontSize: '16px',
              border: '1px solid #ccc'
            }}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
            onClick={() => navigate('/')}
            style={{ 
              padding: '10px 20px',
              border: '1px solid #ccc',
              backgroundColor: '#f5f5f5',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{ 
              padding: '10px 20px',
              backgroundColor: '#0066cc',
              color: 'white',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Create Timer
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTimer;