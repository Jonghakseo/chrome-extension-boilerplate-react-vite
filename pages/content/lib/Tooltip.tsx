import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

const endpoint = 'https://app.realsaige.com';

/**
 * Fetches property details from the API.
 * @param {string} address - The address to query.
 * @returns {Promise<Object>} - The API response in JSON format.
 */
async function fetchPropertyDetails(address: string): Promise<any> {
  const apiUrl = `${endpoint}/api/gethomebyAddress/${encodeURIComponent(address.trim())}`;
  console.log('api url is: ', apiUrl);

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
}

interface TooltipProps {
  x: number;
  y: number;
  address: string;
}

const Tooltip: React.FC<TooltipProps> = ({ x, y, address }) => {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<string>('Loading...');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchPropertyDetails(address);
        // Customize how you want to display the data
        setContent(JSON.stringify(data, null, 2));
      } catch (error) {
        setContent('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [address]);

  return (
    <div
      id="tooltip"
      style={{
        position: 'fixed',
        top: y + 10 + 'px',
        left: x + 10 + 'px',
        backgroundColor: 'white',
        border: '1px solid black',
        padding: '10px',
        zIndex: 1000,
        maxWidth: '300px',
        maxHeight: '200px',
        overflow: 'auto',
      }}>
      {loading ? 'Loading...' : <pre>{content}</pre>}
    </div>
  );
};

export const showTooltip = (x: number, y: number, address: string) => {
  const existingTooltip = document.getElementById('tooltip-container');
  if (existingTooltip) {
    existingTooltip.remove(); // Remove existing tooltip if any
  }

  const tooltipDiv = document.createElement('div');
  tooltipDiv.id = 'tooltip-container';
  document.body.appendChild(tooltipDiv);
  const root = createRoot(tooltipDiv);
  root.render(<Tooltip x={x} y={y} address={address} />);
};

export const closeTooltip = () => {
  const existingTooltip = document.getElementById('tooltip-container');
  if (existingTooltip) {
    existingTooltip.remove();
  }
};

export default Tooltip;
