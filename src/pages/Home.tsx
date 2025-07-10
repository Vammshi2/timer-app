


import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom'; // ✅ Add this line
import { useTimer } from '../context/TimerContext';
import CategorySection from '../components/CategorySection';

const Home: React.FC = () => {
  const { timers } = useTimer();
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const { groupedTimers, categories } = useMemo(() => {
    const filteredTimers = filterCategory === 'all' 
      ? timers 
      : timers.filter(timer => timer.category === filterCategory);

    const grouped = filteredTimers.reduce((acc, timer) => {
      if (!acc[timer.category]) {
        acc[timer.category] = [];
      }
      acc[timer.category].push(timer);
      return acc;
    }, {} as Record<string, typeof timers>);

    const uniqueCategories = Array.from(new Set(timers.map(timer => timer.category)));

    return { groupedTimers: grouped, categories: uniqueCategories };
  }, [timers, filterCategory]);

  if (timers.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>No Timers Yet</h2>
        <p>Create your first timer to get started!</p>
        <Link to="/add" style={{ // ✅ Changed from <a href=...>
          display: 'inline-block',
          padding: '10px 20px',
          backgroundColor: '#0066cc',
          color: 'white',
          textDecoration: 'none',
          marginTop: '20px'
        }}>
          Add Your First Timer
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '30px' }}>
        <h1>My Timers</h1>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ marginRight: '10px' }}>Filter by category:</label>
          <select 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        
        <Link to="/add" style={{ // ✅ Changed from <a href=...>
          display: 'inline-block',
          padding: '8px 16px',
          backgroundColor: '#0066cc',
          color: 'white',
          textDecoration: 'none'
        }}>
          Add New Timer
        </Link>
      </div>

      <div>
        {Object.entries(groupedTimers).map(([category, categoryTimers]) => (
          <CategorySection
            key={category}
            category={category}
            timers={categoryTimers}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
