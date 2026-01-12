import React from 'react';
import './FloorBtn.css';
import SteirsImg from '../../../Sprite/Stairs-icon.svg';

interface FloorBtnProps {
  floorNumber: number;
  isActive: boolean;
  onClick: () => void;
}

const FloorBtn: React.FC<FloorBtnProps> = ({ floorNumber, isActive, onClick }) => {
  const buttonClass = isActive ? 'Floor-Btn--on' : 'Floor-Btn--off';
  const imgClass = isActive ? 'Floor-Btn-img--on' : 'Floor-Btn-img--off';

  return (
    <button className={buttonClass} onClick={onClick}>
      <img src={SteirsImg} alt="" className={imgClass} />
      {floorNumber}
    </button>
  );
};

export default FloorBtn; 