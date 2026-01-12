import React from 'react';
import './SettingsContainer.css';
import MenuLink from '../MenuLink/MenuLink';
import UiwlinkImg from '../../../Sprite/Ui-Link.svg';
import FacebookImg from '../../../Sprite/Facebook-icon.svg';
import InstagramImg from '../../../Sprite/Insta-Icon.svg';
import SettingsImg from '../../../Sprite/Settings.svg';

const SettingsContainer: React.FC = () => {
  return (
    <nav className="SettingsContainer" aria-label="Соцсети и настройки">
      <ul>
        <MenuLink icon={UiwlinkImg} text="Website" href="https://btsau.com.ua/" target="_blank" rel="noopener noreferrer" />
        <MenuLink icon={FacebookImg} text="Facebook" href="https://www.facebook.com/bnau.bc/" target="_blank" rel="noopener noreferrer" />
        <MenuLink icon={InstagramImg} text="Instagram" href="https://www.instagram.com/bnau.bc/" target="_blank" rel="noopener noreferrer" />
        <MenuLink icon={SettingsImg} text="Settings" href="" />
      </ul>
    </nav>
  );
};

export default SettingsContainer; 