export type GeneState = 'unchecked' | 'intermediate' | 'checked';

export type TraitType = 'white' | 'black' | 'albino' | 'anery';

export interface LizardTraits {
  white: GeneState;
  black: GeneState;
  albino: GeneState;
  anery: GeneState;
}

export interface LizardType {
  white1: number;
  black1: number;
  albino1: number;
  anery1: number;
  white2: number;
  black2: number;
  albino2: number;
  anery2: number;
}

export interface GenePercentages {
  visual: number;
  het: number;
  nothing: number;
}

export interface LizardResult {
  name: string;
  fullName: string;
  hetTraits: boolean[];
  probability: number;
  color: string;
}
