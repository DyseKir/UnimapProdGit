import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const variantClass: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'ui-btn--primary',
  secondary: 'ui-btn--secondary',
  ghost: 'ui-btn--ghost',
};

const sizeClass: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'ui-btn--sm',
  md: 'ui-btn--md',
  lg: 'ui-btn--lg',
};

export const Button: React.FC<ButtonProps> = ({
  leftIcon,
  rightIcon,
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) => {
  const classes = ['ui-btn', variantClass[variant], sizeClass[size], className]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} {...props}>
      {leftIcon && <span className="ui-btn__icon ui-btn__icon--left">{leftIcon}</span>}
      {children != null && children !== false && children !== '' && (
        <span className="ui-btn__label">{children}</span>
      )}
      {rightIcon && <span className="ui-btn__icon ui-btn__icon--right">{rightIcon}</span>}
    </button>
  );
};

export default Button;


