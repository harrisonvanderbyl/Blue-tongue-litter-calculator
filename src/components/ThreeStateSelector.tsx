import React from 'react';
import { GeneState } from '../types';

interface ThreeStateSelectorProps {
  id: string;
  name: string;
  value: GeneState;
  onChange: (newState: GeneState) => void;
  disabled?: boolean;
  label: string;
}

export const ThreeStateSelector: React.FC<ThreeStateSelectorProps> = ({
  id,
  name,
  value,
  onChange,
  disabled = false,
  label
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as GeneState);
  };


  const getStateColor = (state: GeneState) => {
    switch (state) {
      case 'unchecked': return '#666';
      case 'intermediate': return '#ff9800';
      case 'checked': return '#4CAF50';
      default: return '#666';
    }
  };

  return (
    <div className="trait-item">
      <label htmlFor={id} className="trait-label">{label}:</label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className="three-state-select"
        style={{ 
          backgroundColor: getStateColor(value),
          color: 'white',
          fontWeight: 'bold'
        }}
      >
        <option value="unchecked">Nothing</option>
        <option value="intermediate">Het</option>
        <option value="checked">Visual</option>
      </select>
    </div>
  );
};
