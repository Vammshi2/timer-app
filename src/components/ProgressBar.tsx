import React from 'react';

interface ProgressBarProps {
  percentage: number;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, className = '' }) => {
  return (
    <div className={`relative w-full bg-gray-200/60 dark:bg-gray-700/60 rounded-full h-3 overflow-hidden shadow-inner ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-gray-100/50 to-gray-200/50 dark:from-gray-800/50 dark:to-gray-700/50"></div>
      <div 
        className="relative h-full bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 transition-all duration-700 ease-out rounded-full shadow-sm"
        style={{ width: `${Math.max(0, Math.min(100, percentage))}%` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
        {percentage > 10 && (
          <div className="absolute right-1 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-white/60 rounded-full animate-pulse"></div>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;