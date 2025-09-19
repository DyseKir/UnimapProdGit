import React from 'react';

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const TextInput: React.FC<TextInputProps> = ({ label, className, ...props }) => {
  return (
    <label className="ui-input">
      {label && <span className="ui-input__label">{label}</span>}
      <input className={["ui-input__field", className].filter(Boolean).join(' ')} {...props} />
    </label>
  );
};

export default TextInput;


