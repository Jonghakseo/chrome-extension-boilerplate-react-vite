import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';

interface TooltipProps {
  x: number;
  y: number;
}

const Tooltip: React.FC<TooltipProps> = ({ x, y }) => {
  useEffect(() => {
    console.log('Tooltip component rendered');
  }, []);

  return (
    <div
      id="tooltip"
      style={{
        position: 'fixed',
        top: y + 10 + 'px', // Position a little below the cursor
        left: x + 10 + 'px', // Position a little to the right of the cursor
        backgroundColor: 'white',
        border: '1px solid black',
        padding: '10px',
        zIndex: 1000,
      }}>
      Working!
    </div>
  );
};

export const renderTooltip = (x: number, y: number) => {
  const existingTooltip = document.getElementById('tooltip-container');
  if (existingTooltip) {
    existingTooltip.remove(); // Remove existing tooltip if any
  }

  const tooltipDiv = document.createElement('div');
  tooltipDiv.id = 'tooltip-container';
  document.body.appendChild(tooltipDiv);
  const root = createRoot(tooltipDiv);
  root.render(<Tooltip x={x} y={y} />);
};

export default Tooltip;
