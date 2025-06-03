import React, { useState, useEffect } from 'react';
import { LizardTraits, TraitType, GeneState, LizardResult } from './types';
import { LizardSelector } from './components/LizardSelector';
import { ResultsChart } from './components/ResultsChart';
import { calculateResults } from './utils/genetics';

const initialTraits: LizardTraits = {
  white: 'unchecked',
  black: 'unchecked',
  albino: 'unchecked',
  anery: 'unchecked',
};

function App() {
  const [lizard1Traits, setLizard1Traits] = useState<LizardTraits>(initialTraits);
  const [lizard2Traits, setLizard2Traits] = useState<LizardTraits>(initialTraits);
  const [results, setResults] = useState<LizardResult[]>([]);

  const handleLizard1TraitChange = (trait: TraitType, newState: GeneState) => {
    setLizard1Traits(prev => ({
      ...prev,
      [trait]: newState
    }));
  };

  const handleLizard2TraitChange = (trait: TraitType, newState: GeneState) => {
    setLizard2Traits(prev => ({
      ...prev,
      [trait]: newState
    }));
  };

  useEffect(() => {
    const newResults = calculateResults(lizard1Traits, lizard2Traits);
    setResults(newResults);
  }, [lizard1Traits, lizard2Traits]);

  return (
    <div className="app">
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#fff' }}>
        Blue-tongue Litter Calculator
      </h1>
      
      <div className="main-content">
        {/* Left Panel - Controls */}
        <div className="left-panel">
          {/* Key Section */}
          <div className="key-section">
            <h1>Genetic States Explained</h1>
            <div className="key-explanations">
              <div className="key-explanation">
                <span className="state-badge nothing">Nothing</span>
                <span className="explanation-text">No copies of the gene - lizard doesn't carry this trait</span>
              </div>
              <div className="key-explanation">
                <span className="state-badge het">Het</span>
                <span className="explanation-text">Heterozygous - carries one copy of the gene (hidden trait)</span>
              </div>
              <div className="key-explanation">
                <span className="state-badge visual">Visual</span>
                <span className="explanation-text">Homozygous - carries two copies of the gene (visible trait)</span>
              </div>
            </div>
          </div>

          {/* Lizard Selectors */}
          <div className="lizard-selectors">
            <LizardSelector
              lizardNumber={1}
              traits={lizard1Traits}
              onTraitChange={handleLizard1TraitChange}
            />

            <LizardSelector
              lizardNumber={2}
              traits={lizard2Traits}
              onTraitChange={handleLizard2TraitChange}
            />
          </div>
        </div>

        {/* Right Panel - Results */}
        <div className="right-panel">
          <div className="result-section">
            <h1>Result</h1>
            <ResultsChart results={results} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
