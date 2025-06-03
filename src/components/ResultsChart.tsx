import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { LizardResult } from '../types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ResultsChartProps {
  results: LizardResult[];
}

export const ResultsChart: React.FC<ResultsChartProps> = ({ results }) => {
  const data = {
    labels: results.map(result => result.fullName),
    datasets: [
      {
        label: 'Probability',
        data: results.map(result => result.probability),
        backgroundColor: results.map(result => result.color),
        borderColor: results.map(result => result.color),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          boxWidth: 12,
          padding: 15,
          font: {
            size: 12,
          },
          generateLabels: (chart: any) => {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label: string, i: number) => {
                const dataset = data.datasets[0];
                const value = dataset.data[i];
                const percentage = ((value / dataset.data.reduce((a: number, b: number) => a + b, 0)) * 100).toFixed(1);
                
                return {
                  text: `${label} (${percentage}%)`,
                  fillStyle: dataset.backgroundColor[i],
                  strokeStyle: dataset.borderColor[i],
                  lineWidth: dataset.borderWidth,
                  hidden: false,
                  index: i,
                };
              });
            }
            return [];
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.parsed;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${percentage}%`;
          },
        },
      },
    },
  };

  if (results.length === 0) {
    return (
      <div className="chart-container">
        <p>No results to display. Please select traits for both lizards.</p>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <Pie data={data} options={options} />
    </div>
  );
};
