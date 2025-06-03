import React from 'react';
import { LizardTraits, TraitType, GeneState } from '../types';
import { ThreeStateSelector } from './ThreeStateSelector';

interface LizardSelectorProps {
  lizardNumber: number;
  traits: LizardTraits;
  onTraitChange: (trait: TraitType, newState: GeneState) => void;
}

export const LizardSelector: React.FC<LizardSelectorProps> = ({
  lizardNumber,
  traits,
  onTraitChange
}) => {
  const traitLabels: { [key in TraitType]: string } = {
    white: 'White',
    black: 'Black',
    albino: 'Albino',
    anery: 'Anery'
  };

  return (
    <div className="lizard-section">
      <h1>Lizard {lizardNumber}</h1>
      <div className="trait-controls">
        {(Object.keys(traitLabels) as TraitType[]).map((trait) => (
          <ThreeStateSelector
            key={trait}
            id={`${trait}-${lizardNumber}`}
            name={trait}
            value={traits[trait]}
            onChange={(newState) => onTraitChange(trait, newState)}
            label={traitLabels[trait]}
          />
        ))}
      </div>
    </div>
  );
};
