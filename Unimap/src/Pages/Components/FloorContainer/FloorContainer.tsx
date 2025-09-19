import React from 'react';
import './FloorContainer.css';
import FloorSwitcher from '../FloorBtn/FloorSwitcher';

interface FloorContainerProps {
  activeFloor: number;
  onFloorChange: (floor: number) => void;
}

const FloorContainer: React.FC<FloorContainerProps> = ({ 
  activeFloor, 
  onFloorChange 
}) => {
  return (
    <div className="FloorContainer">
      <span className="FloorContainer-text">Поверх:</span>
      <FloorSwitcher 
        activeFloor={activeFloor}
        onFloorChange={onFloorChange}
      />
    </div>
  );
};

export default FloorContainer; 