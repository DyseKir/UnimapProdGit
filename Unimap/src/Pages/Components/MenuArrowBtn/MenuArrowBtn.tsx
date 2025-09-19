import React from "react";
import "./MenuArrowBtn.css";
import type { MenuArrowBtnProps } from "../MenuArrowBtn/props";
import Button from "../UI/Button";

const MenuArrowBtn: React.FC<MenuArrowBtnProps> = ({ icon, children, ...props }) => (
  <Button className="menu-arrow-btn" leftIcon={icon} variant="ghost" {...props}>
    {children}
  </Button>
);

export default MenuArrowBtn;
