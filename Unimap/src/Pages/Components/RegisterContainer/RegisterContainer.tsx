import React from 'react';
import './RegisterContainer.css';
import UniversityLogo from '../../../Sprite/universityLogo1 1.svg';
import ThreeDots from '../../../Sprite/ThreeDots.svg';

const RegisterContainer: React.FC = () => {
  return (
    <div className="RegisterContainer">
      <div className="RegisterContainer-block">
        <img src={UniversityLogo} alt="" className="RegisterContainer-Logo"/>
        <span className="RegisterContainer-text">Guest</span>
      </div>
      <img src={ThreeDots} alt="" className="RegisterContainer-dots"/>
    </div>
  );
};

export default RegisterContainer; 