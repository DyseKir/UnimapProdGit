import React from "react";
import "./MenuLink.css";
import AppLink from "../UI/AppLink";

interface MenuLinkProps {
  icon: string;
  text: string;
  href: string;
  target?: string;
  rel?: string;
}

const MenuLink: React.FC<MenuLinkProps> = ({ icon, text, href, target, rel }) => {
  return (
    <li className="menu-link">
      <AppLink href={href} target={target} rel={rel} leftIcon={<img src={icon} alt="" className="menu-link-img"/>}>
        {text}
      </AppLink>
    </li>
  );
};

export default MenuLink; 