import React, { useState } from 'react';
import { Timer } from '../types/timer';
import { useTimer } from '../context/TimerContext';
import TimerItem from './TimerItem';

interface CategorySectionProps {
  category: string;
  timers: Timer[];
}

const CategorySection: React.FC<CategorySectionProps> = ({ category, timers }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { dispatch } = useTimer();

  const handleBulkAction = (action: 'start' | 'pause' | 'reset') => {
    dispatch({
      type: 'BULK_ACTION',
      payload: { category, action }
    });
  };

  return (
    <div style={{ 
      border: '2px solid #333', 
      marginBottom: '20px',
      backgroundColor: '#f9f9f9'
    }}>
      <div style={{ 
        padding: '15px', 
        borderBottom: '1px solid #ddd',
        backgroundColor: '#e9e9e9'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              style={{ 
                background: 'none', 
                border: 'none', 
                fontSize: '18px', 
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              {isExpanded ? '▼' : '▶'} {category.toUpperCase()} ({timers.length})
            </button>
          </div>
          
          <div>
            <button 
              onClick={() => handleBulkAction('start')}
              style={{ marginRight: '5px', fontSize: '12px' }}
            >
              Start All
            </button>
            <button 
              onClick={() => handleBulkAction('pause')}
              style={{ marginRight: '5px', fontSize: '12px' }}
            >
              Pause All
            </button>
            <button 
              onClick={() => handleBulkAction('reset')}
              style={{ fontSize: '12px' }}
            >
              Reset All
            </button>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div style={{ padding: '15px' }}>
          {timers.map(timer => (
            <TimerItem key={timer.id} timer={timer} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySection;