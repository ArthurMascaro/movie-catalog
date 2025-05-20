import React from 'react';

interface GridItemProps {
  children: React.ReactNode;
  className?: string;
}

const GridItem: React.FC<GridItemProps> = ({ children, className = '' }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default GridItem; 