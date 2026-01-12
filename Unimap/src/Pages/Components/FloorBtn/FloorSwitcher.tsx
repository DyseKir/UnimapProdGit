import React from 'react';
import './FloorSwitcher.css';
import SteirsImg from '../../../Sprite/Stairs-icon.svg';

interface FloorSwitcherProps {
  activeFloor: number;
  onFloorChange: (floor: number) => void;
}

const FloorSwitcher: React.FC<FloorSwitcherProps> = ({ activeFloor, onFloorChange }) => {
  return (
    <div className="floor-switcher-container">
      <div className="floor-switcher">
        <button 
          className={`floor-segment ${activeFloor === 1 ? 'active' : 'inactive'}`}
          onClick={() => onFloorChange(1)}
        >
          <img src={SteirsImg} alt="" className="floor-icon" />
          <span>1</span>
        </button>
        <button 
          className={`floor-segment ${activeFloor === 2 ? 'active' : 'inactive'}`}
          onClick={() => onFloorChange(2)}
        >
          <img src={SteirsImg} alt="" className="floor-icon" />
          <span>2</span>
        </button>
        <button 
          className={`floor-segment ${activeFloor === 3 ? 'active' : 'inactive'}`}
          onClick={() => onFloorChange(3)}
        >
          <img src={SteirsImg} alt="" className="floor-icon" />
          <span>3</span>
        </button>
      </div>
    </div>
  );
};

export default FloorSwitcher; 