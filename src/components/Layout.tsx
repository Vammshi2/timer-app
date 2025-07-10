import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: 0, padding: '20px' }}>
      <header style={{ borderBottom: '1px solid #ccc', paddingBottom: '20px', marginBottom: '30px' }}>
        <h1 style={{ margin: 0, color: '#333' }}>Timer App</h1>
        <nav style={{ marginTop: '10px' }}>
          <Link 
            to="/" 
            style={{ 
              marginRight: '20px', 
              textDecoration: location.pathname === '/' ? 'underline' : 'none',
              color: '#0066cc'
            }}
          >
            Home
          </Link>
          <Link 
            to="/add" 
            style={{ 
              marginRight: '20px', 
              textDecoration: location.pathname === '/add' ? 'underline' : 'none',
              color: '#0066cc'
            }}
          >
            Add Timer
          </Link>
          <Link 
            to="/history" 
            style={{ 
              textDecoration: location.pathname === '/history' ? 'underline' : 'none',
              color: '#0066cc'
            }}
          >
            History
          </Link>
        </nav>
      </header>
      
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;