import { GeneState, LizardTraits, LizardType, LizardResult } from '../types';

export function getGenePercentagesVisual(gene1: GeneState, gene2: GeneState): number {
  if (gene1 === 'unchecked' && gene2 === 'unchecked') return 0;
  if (gene1 === 'unchecked' && gene2 === 'intermediate') return 0;
  if (gene1 === 'unchecked' && gene2 === 'checked') return 0;
  if (gene1 === 'intermediate' && gene2 === 'unchecked') return 0;
  if (gene1 === 'intermediate' && gene2 === 'intermediate') return 25;
  if (gene1 === 'intermediate' && gene2 === 'checked') return 50;
  if (gene1 === 'checked' && gene2 === 'unchecked') return 0;
  if (gene1 === 'checked' && gene2 === 'intermediate') return 50;
  if (gene1 === 'checked' && gene2 === 'checked') return 100;
  return 0;
}

export function getGenePercentagesHet(gene1: GeneState, gene2: GeneState): number {
  if (gene1 === 'unchecked' && gene2 === 'unchecked') return 0;
  if (gene1 === 'unchecked' && gene2 === 'intermediate') return 50;
  if (gene1 === 'unchecked' && gene2 === 'checked') return 100;
  if (gene1 === 'intermediate' && gene2 === 'unchecked') return 50;
  if (gene1 === 'intermediate' && gene2 === 'intermediate') return 50;
  if (gene1 === 'intermediate' && gene2 === 'checked') return 50;
  if (gene1 === 'checked' && gene2 === 'unchecked') return 100;
  if (gene1 === 'checked' && gene2 === 'intermediate') return 50;
  if (gene1 === 'checked' && gene2 === 'checked') return 0;
  return 0;
}

export function createLizardType(
  white1: number, black1: number, albino1: number, anery1: number,
  white2: number, black2: number, albino2: number, anery2: number
): LizardType {
  return { white1, black1, albino1, anery1, white2, black2, albino2, anery2 };
}

export function calculateProbability(
  lizard: LizardType,
  whiteVisual: number, blackVisual: number, albinoVisual: number, aneryVisual: number,
  whiteHet: number, blackHet: number, albinoHet: number, aneryHet: number,
  whiteNothing: number, blackNothing: number, albinoNothing: number, aneryNothing: number
): number {
  let startnum = 1000;

  if (lizard.white1 + lizard.white2 === 2) startnum *= whiteVisual / 100;
  if (lizard.black1 + lizard.black2 === 2) startnum *= blackVisual / 100;
  if (lizard.albino1 + lizard.albino2 === 2) startnum *= albinoVisual / 100;
  if (lizard.anery1 + lizard.anery2 === 2) startnum *= aneryVisual / 100;

  if (lizard.white1 + lizard.white2 === 1) startnum *= whiteHet / 100;
  if (lizard.black1 + lizard.black2 === 1) startnum *= blackHet / 100;
  if (lizard.albino1 + lizard.albino2 === 1) startnum *= albinoHet / 100;
  if (lizard.anery1 + lizard.anery2 === 1) startnum *= aneryHet / 100;

  if (lizard.white1 + lizard.white2 === 0) startnum *= whiteNothing / 100;
  if (lizard.black1 + lizard.black2 === 0) startnum *= blackNothing / 100;
  if (lizard.albino1 + lizard.albino2 === 0) startnum *= albinoNothing / 100;
  if (lizard.anery1 + lizard.anery2 === 0) startnum *= aneryNothing / 100;

  return startnum / 1000;
}

export function getLizardColor(lizard: LizardType): string {
  const blk = [0, 0, 0];
  const wht = [255, 255, 255];
  const red = [255, 0, 0];
  const ann = [64, 64, 64];
  const brn = [128, 64, 0];

  const amounts = [
    (lizard.black1 + lizard.black2) / 2,
    (lizard.white1 + lizard.white2) / 2,
    (lizard.albino1 + lizard.albino2) / 2,
    (lizard.anery1 + lizard.anery2) / 2,
    (!(lizard.white1 && lizard.white2) && !(lizard.black1 && lizard.black2) && 
     !(lizard.albino1 && lizard.albino2) && !(lizard.anery1 && lizard.anery2)) ? 1 : 0
  ];

  const amttot = amounts.reduce((a, b) => a + b, 0);
  
  const col = [
    (blk[0] * amounts[0] + wht[0] * amounts[1] + red[0] * amounts[2] + ann[0] * amounts[3] + brn[0] * amounts[4]) / amttot,
    (blk[1] * amounts[0] + wht[1] * amounts[1] + red[1] * amounts[2] + ann[1] * amounts[3] + brn[1] * amounts[4]) / amttot,
    (blk[2] * amounts[0] + wht[2] * amounts[1] + red[2] * amounts[2] + ann[2] * amounts[3] + brn[2] * amounts[4]) / amttot
  ];

  return `rgba(${Math.round(col[0])}, ${Math.round(col[1])}, ${Math.round(col[2])}, 1)`;
}

export function getLizardName(lizard: LizardType): [string, boolean[], string] {
  const hasVisualWhite = lizard.white1 && lizard.white2;
  const hasVisualBlack = lizard.black1 && lizard.black2;
  const hasVisualAlbino = lizard.albino1 && lizard.albino2;
  const hasVisualAnery = lizard.anery1 && lizard.anery2;

  const isWhite = hasVisualWhite && !hasVisualBlack && !hasVisualAlbino && !hasVisualAnery;
  const isBlack = hasVisualBlack && !hasVisualWhite && !hasVisualAlbino && !hasVisualAnery;
  const isAlbino = hasVisualAlbino && !hasVisualWhite && !hasVisualBlack && !hasVisualAnery;
  const isAnery = hasVisualAnery && !hasVisualWhite && !hasVisualBlack && !hasVisualAlbino;

  const isPlatinum = hasVisualWhite && hasVisualBlack && !hasVisualAlbino && !hasVisualAnery;
  const isAlabaster = hasVisualWhite && hasVisualAnery && !hasVisualBlack && !hasVisualAlbino;
  const isSunglow = hasVisualWhite && hasVisualAlbino && !hasVisualBlack && !hasVisualAnery;
  
  const isLava = hasVisualBlack && hasVisualAlbino && !hasVisualWhite && !hasVisualAnery;
  const isBlackout = hasVisualBlack && hasVisualAnery && !hasVisualWhite && !hasVisualAlbino;
  
  const isSnow = hasVisualAlbino && hasVisualAnery && !hasVisualWhite && !hasVisualBlack;
  
  const isVisAllgene = hasVisualBlack && hasVisualWhite && hasVisualAlbino && hasVisualAnery;
  const isHyperSunglow = hasVisualBlack && !hasVisualWhite && hasVisualAlbino && hasVisualAnery;
  const isPearl = hasVisualBlack && hasVisualWhite && !hasVisualAlbino && hasVisualAnery;
  const isSunkissed = hasVisualBlack && hasVisualWhite && hasVisualAlbino && !hasVisualAnery;
  const isMoonglow = !hasVisualBlack && hasVisualWhite && hasVisualAlbino && hasVisualAnery;

  const isGarden = !hasVisualBlack && !hasVisualWhite && !hasVisualAlbino && !hasVisualAnery;

  let name = "";

  if (isWhite) name += "Visual White";
  if (isBlack) name += "Visual Black";
  if (isAlbino) name += "Visual Albino";
  if (isAnery) name += "Visual Anery";
  if (isPlatinum) name += "Visual Platinum";
  if (isAlabaster) name += "Visual Alabaster";
  if (isSunglow) name += "Visual Sunglow";
  if (isLava) name += "Visual Lava";
  if (isBlackout) name += "Visual Blackout";
  if (isSnow) name += "Visual Snow";
  if (isVisAllgene) name += "Visual Allgene";
  if (isHyperSunglow) name += "Visual Hyper Snow";
  if (isPearl) name += "Visual Pearl";
  if (isSunkissed) name += "Visual Sunkissed";
  if (isMoonglow) name += "Visual Moonglow";
  if (isGarden) name += "Normal";

  const hetWhite = lizard.white1 + lizard.white2 === 1;
  const hetBlack = lizard.black1 + lizard.black2 === 1;
  const hetAlbino = lizard.albino1 + lizard.albino2 === 1;
  const hetAnery = lizard.anery1 + lizard.anery2 === 1;

  let hetName = "";

  if (lizard.white1 + lizard.white2 > 0 && lizard.white1 + lizard.white2 < 2) {
    hetName += ",Het White";
  }
  if (lizard.black1 + lizard.black2 > 0 && lizard.black1 + lizard.black2 < 2) {
    hetName += ",Het Black";
  }
  if (lizard.albino1 + lizard.albino2 > 0 && lizard.albino1 + lizard.albino2 < 2) {
    hetName += ",Het Alb";
  }
  if (lizard.anery1 + lizard.anery2 > 0 && lizard.anery1 + lizard.anery2 < 2) {
    hetName += ",Het Anery";
  }

  return [name, [hetWhite, hetBlack, hetAlbino, hetAnery], name + hetName];
}

export function generateAllLizards(): LizardType[] {
  const lizards: LizardType[] = [];

  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      for (let k = 0; k < 2; k++) {
        for (let l = 0; l < 2; l++) {
          for (let m = 0; m < 2; m++) {
            for (let n = 0; n < 2; n++) {
              for (let o = 0; o < 2; o++) {
                for (let p = 0; p < 2; p++) {
                  lizards.push(createLizardType(i, j, k, l, m, n, o, p));
                }
              }
            }
          }
        }
      }
    }
  }

  return lizards;
}

export function calculateResults(lizard1: LizardTraits, lizard2: LizardTraits): LizardResult[] {
  const whiteVisual = getGenePercentagesVisual(lizard1.white, lizard2.white);
  const blackVisual = getGenePercentagesVisual(lizard1.black, lizard2.black);
  const albinoVisual = getGenePercentagesVisual(lizard1.albino, lizard2.albino);
  const aneryVisual = getGenePercentagesVisual(lizard1.anery, lizard2.anery);

  const whiteHet = getGenePercentagesHet(lizard1.white, lizard2.white);
  const blackHet = getGenePercentagesHet(lizard1.black, lizard2.black);
  const albinoHet = getGenePercentagesHet(lizard1.albino, lizard2.albino);
  const aneryHet = getGenePercentagesHet(lizard1.anery, lizard2.anery);

  const whiteNothing = 100 - whiteHet - whiteVisual;
  const blackNothing = 100 - blackHet - blackVisual;
  const albinoNothing = 100 - albinoHet - albinoVisual;
  const aneryNothing = 100 - aneryHet - aneryVisual;

  const allLizards = generateAllLizards();
  
  const lizardsWithProbability = allLizards.map(lizard => {
    const probability = calculateProbability(
      lizard,
      whiteVisual, blackVisual, albinoVisual, aneryVisual,
      whiteHet, blackHet, albinoHet, aneryHet,
      whiteNothing, blackNothing, albinoNothing, aneryNothing
    );
    
    const [name, hetTraits, fullName] = getLizardName(lizard);
    const color = getLizardColor(lizard);
    
    return {
      name,
      fullName,
      hetTraits,
      probability,
      color,
      lizard
    };
  });

  // Remove duplicates and filter out zero probability
  const uniqueLizards: LizardResult[] = [];
  const seenNames = new Set<string>();

  for (const lizard of lizardsWithProbability) {
    if (lizard.probability > 0 && !seenNames.has(lizard.fullName)) {
      seenNames.add(lizard.fullName);
      uniqueLizards.push({
        name: lizard.name,
        fullName: lizard.fullName,
        hetTraits: lizard.hetTraits,
        probability: lizard.probability,
        color: lizard.color
      });
    }
  }

  // Group by visual name and calculate het percentages
  const visualGroups: { [key: string]: LizardResult[] } = {};
  
  uniqueLizards.forEach(lizard => {
    if (!visualGroups[lizard.name]) {
      visualGroups[lizard.name] = [];
    }
    visualGroups[lizard.name].push(lizard);
  });

  const finalResults: LizardResult[] = [];
  
  Object.keys(visualGroups).forEach(visualName => {
    const group = visualGroups[visualName];
    const totalProbability = group.reduce((sum, lizard) => sum + lizard.probability, 0);
    
    const hetPercentages: { [key: string]: number } = {};
    
    group.forEach(lizard => {
      const traits = ['White', 'Black', 'Albino', 'Anery'];
      lizard.hetTraits.forEach((isHet, index) => {
        if (isHet) {
          const traitName = traits[index];
          if (!hetPercentages[traitName]) {
            hetPercentages[traitName] = 0;
          }
          hetPercentages[traitName] += lizard.probability;
        }
      });
    });

    let fullNameWithHets = visualName;
    Object.keys(hetPercentages).forEach(trait => {
      const percentage = Math.floor((hetPercentages[trait] / totalProbability) * 100);
      if (percentage > 0) {
        fullNameWithHets += `, ${percentage}% Het ${trait}`;
      }
    });

    finalResults.push({
      name: visualName,
      fullName: fullNameWithHets,
      hetTraits: [],
      probability: totalProbability,
      color: group[0].color
    });
  });

  return finalResults.sort((a, b) => b.probability - a.probability);
}
