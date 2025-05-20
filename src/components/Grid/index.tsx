import React from 'react';

interface GridProps {
  children: React.ReactNode;
  className?: string;
}

const Grid: React.FC<GridProps> = ({ children, className = '' }) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ${className}`}>
      {children}
    </div>
  );
};

export default Grid; 