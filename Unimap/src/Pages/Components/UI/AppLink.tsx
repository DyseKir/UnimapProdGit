import React from 'react';

export interface AppLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  leftIcon?: React.ReactNode;
}

export const AppLink: React.FC<AppLinkProps> = ({ leftIcon, className, children, ...props }) => {
  return (
    <a className={["ui-link", className].filter(Boolean).join(' ')} {...props}>
      {leftIcon && <span className="ui-link__icon">{leftIcon}</span>}
      <span className="ui-link__label">{children}</span>
    </a>
  );
};

export default AppLink;


