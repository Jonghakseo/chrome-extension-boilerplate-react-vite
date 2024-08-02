// src/tooltipScript.ts

/**
 * Initialize the tooltip functionality.
 * @returns A cleanup function to remove event listeners and the tooltip.
 */
export function initializeTooltip() {
  // Create the tooltip element
  const tooltip = document.createElement('div');
  tooltip.className = 'custom-tooltip';
  document.body.appendChild(tooltip);

  // Function to get the appropriate regex based on the URL
  function getRegex(): RegExp {
    const currentUrl = window.location.href;
    if (currentUrl.includes('mail.google.com')) {
      return new RegExp(
        '(\\d+\\s+\\d+\\s+\\d+\\s+[A-Z0-9]+(?:\\s+[A-Z0-9]+)*\\s+(ST\\.?|STREET|AVENUE|AVE\\.?|DRIVE|DR\\.?|PLACE|PL\\.?|CRESCENT|CR\\.?|ROAD|RD\\.?|LANE|LN\\.?|BOULEVARD|BLVD\\.?|WAY|WY\\.?|SQUARE|SQ\\.?|TRAIL|TRL\\.?|PARK|PK\\.?|CIRCLE|CIR\\.?|COURT|CT\\.?|ALLEY|ALY|HIGHWAY|HWY|COURT|CT)\\s+(#\\d+)?)',
        'i',
      );
    } else {
      return new RegExp(
        '^(?:\\d+\\s+)?' + // Optional leading unit number followed by space
          '\\d+\\s+' + // Number at the start of the address
          '(?:\\d+-\\d+\\s+)?' + // Optional range of numbers followed by space
          '(?:\\d+-)?\\d*\\s*' + // Optional unit number which may include a dash
          '[A-Z0-9]+(?:\\s+[A-Z0-9]+)*' + // Street name (combination of words and/or numbers)
          '(\\s+ST\\.?|\\s+STREET|\\s+AVENUE|\\s+AVE\\.?|\\s+DRIVE|\\s+DR\\.?|\\s+PLACE|\\s+PL\\.?|\\s+CRESCENT|\\s+CR\\.?|\\s+ROAD|\\s+RD\\.?|\\s+LANE|\\s+LN\\.?|\\s+BOULEVARD|\\s+BLVD\\.?|\\s+WAY|\\s+WY\\.?|\\s+SQUARE|\\s+SQ\\.?|\\s+TRAIL|\\s+TRL\\.?|\\s+PARK|\\s+PK\\.?|\\s+CIRCLE|\\s+CIR\\.?|\\s+COURT|\\s+CT\\.?|\\s+ALLEY|\\s+ALY|\\s+HIGHWAY|\\s+HWY|\\s+COURT|\\s+CT)' + // Street suffix (required)
          '(\\s+#\\d+)?', // Optional unit number prefixed by #
        'i', // Ignore case
      );
    }
  }

  // Function to handle the context menu event
  const handleContextMenu = (event: MouseEvent) => {
    const regex = getRegex();
    const elementUnderCursor = document.elementFromPoint(event.clientX, event.clientY);
    console.log('WORKING');
    if (elementUnderCursor && elementUnderCursor.textContent) {
      const textUnderCursor = elementUnderCursor.textContent.trim();
      if (regex.test(textUnderCursor)) {
        tooltip.textContent = 'Address Found'; // Tooltip content
        tooltip.style.display = 'block';
        tooltip.style.left = `${event.clientX + 10}px`; // Position right of cursor
        tooltip.style.top = `${event.clientY + 10}px`; // Position below cursor
        event.preventDefault(); // Prevent default context menu
      } else {
        tooltip.style.display = 'none';
      }
    } else {
      tooltip.style.display = 'none';
    }
  };

  // Function to handle clicks to hide the tooltip
  const handleClick = () => {
    tooltip.style.display = 'none'; // Hide tooltip on click
  };

  // Add event listeners
  document.addEventListener('contextmenu', handleContextMenu);
  document.addEventListener('click', handleClick);

  // Return a cleanup function to remove event listeners and the tooltip
  return () => {
    document.removeEventListener('contextmenu', handleContextMenu);
    document.removeEventListener('click', handleClick);
    document.body.removeChild(tooltip);
  };
}
