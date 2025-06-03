# Blue-tongue Litter Calculator

A React TypeScript application for calculating Blue-tongue lizard morph genetics and predicting offspring probabilities.

## Features

- **Three-state Genetics**: Each trait can be in one of three states:
  - Nothing (unchecked): No gene present
  - Het (indeterminate): Heterozygous - carries one copy of the gene
  - Visual (checked): Homozygous - carries two copies of the gene (visual trait)

- **Four Genetic Traits**: 
  - White
  - Black
  - Albino
  - Anery

- **Interactive Interface**: Click checkboxes to cycle through the three states

- **Real-time Results**: Pie chart showing probability distribution of offspring morphs

- **Complex Morph Calculations**: Automatically calculates complex morphs like:
  - Platinum (White + Black)
  - Sunglow (White + Albino)
  - Snow (Albino + Anery)
  - And many more combinations

## How to Use

1. **Set Parent Traits**: For each parent lizard, click the checkboxes to set their genetic traits
   - Empty checkbox = No gene
   - Orange/indeterminate checkbox = Het (carries one copy)
   - Checked checkbox = Visual (carries two copies)

2. **View Results**: The pie chart automatically updates to show the probability distribution of offspring

3. **Interpret Results**: Each slice shows:
   - The morph name
   - Het percentages for carried genes
   - Probability percentage

## Development

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Deployment

This project is automatically deployed to GitHub Pages when changes are pushed to the main branch.

### GitHub Pages Setup
1. Go to your repository settings
2. Navigate to "Pages" in the sidebar
3. Under "Source", select "GitHub Actions"
4. The deployment workflow will automatically run on every push to main

### Manual Deployment
If you need to deploy manually:
```bash
npm run build
# Upload the contents of the 'dist' folder to your web server
```

The live application is available at: `https://[username].github.io/Blue-tongue-litter-calculator/`

## Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Chart.js** - Data visualization
- **React Chart.js 2** - React wrapper for Chart.js

## Project Structure

```
src/
├── components/
│   ├── ThreeStateCheckbox.tsx    # Custom three-state checkbox component
│   ├── LizardSelector.tsx        # Parent lizard trait selector
│   └── ResultsChart.tsx          # Pie chart for results
├── utils/
│   └── genetics.ts               # Genetics calculation logic
├── types.ts                      # TypeScript type definitions
├── App.tsx                       # Main application component
├── main.tsx                      # Application entry point
└── index.css                     # Global styles
```

## Genetics Logic

The application implements Mendelian genetics principles:

- **Visual x Visual** = 100% Visual offspring
- **Visual x Het** = 50% Visual, 50% Het offspring
- **Het x Het** = 25% Visual, 50% Het, 25% Nothing offspring
- **Visual x Nothing** = 100% Het offspring
- **Het x Nothing** = 50% Het, 50% Nothing offspring
- **Nothing x Nothing** = 100% Nothing offspring

Complex morphs are calculated by combining multiple traits according to their genetic interactions.
