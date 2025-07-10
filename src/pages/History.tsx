import React, { useState } from 'react';
import { useTimer } from '../context/TimerContext';

const History: React.FC = () => {
  const { history, exportHistory } = useTimer();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const filteredHistory = history.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(history.map(item => item.category)));

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${remainingSeconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${remainingSeconds}s`;
  };

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (history.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>No History Yet</h2>
        <p>Complete some timers to see your history here!</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '30px' }}>
        <h1>Timer History</h1>
        <p>Total completed: {history.length}</p>
        
        <button 
          onClick={exportHistory}
          style={{ 
            padding: '8px 16px',
            backgroundColor: '#0066cc',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          Export History
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Search timers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ 
              padding: '8px', 
              marginRight: '10px',
              border: '1px solid #ccc',
              width: '200px'
            }}
          />
          
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            style={{ 
              padding: '8px',
              border: '1px solid #ccc'
            }}
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        {filteredHistory.map((item) => (
          <div 
            key={item.id} 
            style={{ 
              border: '1px solid #ddd', 
              padding: '15px', 
              marginBottom: '10px',
              backgroundColor: '#f9f9f9'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ margin: '0 0 5px 0' }}>{item.name}</h3>
                <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
                  Category: {item.category} | Duration: {formatDuration(item.duration)}
                </p>
              </div>
              <div style={{ textAlign: 'right', fontSize: '14px', color: '#666' }}>
                {formatDate(item.completedAt)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredHistory.length === 0 && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p>No history found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default History;