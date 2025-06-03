import React, { useEffect, useRef } from 'react';
import { GeneState } from '../types';

interface ThreeStateCheckboxProps {
  id: string;
  name: string;
  value: GeneState;
  onChange: (newState: GeneState) => void;
  disabled?: boolean;
  label: string;
}

export const ThreeStateCheckbox: React.FC<ThreeStateCheckboxProps> = ({
  id,
  name,
  value,
  onChange,
  disabled = false,
  label
}) => {
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (checkboxRef.current) {
      if (value === 'unchecked') {
        checkboxRef.current.checked = false;
        checkboxRef.current.indeterminate = false;
      } else if (value === 'checked') {
        checkboxRef.current.checked = true;
        checkboxRef.current.indeterminate = false;
      } else if (value === 'intermediate') {
        checkboxRef.current.checked = false;
        checkboxRef.current.indeterminate = true;
      }
    }
  }, [value]);

  const handleClick = () => {
    if (disabled) return;

    let newState: GeneState;
    if (value === 'unchecked') {
      newState = 'intermediate';
    } else if (value === 'intermediate') {
      newState = 'checked';
    } else {
      newState = 'unchecked';
    }
    onChange(newState);
  };

  return (
    <div className="trait-item">
      <input
        ref={checkboxRef}
        type="checkbox"
        id={id}
        name={name}
        className="three-state-checkbox"
        onClick={handleClick}
        disabled={disabled}
        readOnly
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
