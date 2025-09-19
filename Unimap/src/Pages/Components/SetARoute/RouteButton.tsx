import React from 'react';
import './RouteButton.css';
import WalkPerson from '../../../Sprite/Person-walk.svg';
import Button from '../UI/Button';

interface RouteButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const RouteButton: React.FC<RouteButtonProps> = ({ onClick, disabled = false }) => {
  return (
    <Button className="ui-btn--block" onClick={onClick} disabled={disabled} leftIcon={<img src={WalkPerson} alt="walk" className="RouteButton-icon" />}>
      Побудувати маршрут
    </Button>
  );
};

export default RouteButton; 