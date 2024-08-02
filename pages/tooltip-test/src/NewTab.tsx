import '@src/NewTab.css';
import '@src/NewTab.scss';
import { useStorageSuspense, withErrorBoundary, withSuspense } from '@extension/shared';
import { exampleThemeStorage } from '@extension/storage';
import { Button } from '@extension/ui';
import { useEffect } from 'react';
import { initializeTooltip } from '@src/tooltipScript'; // Import the tooltip script

const NewTab = () => {
  const theme = useStorageSuspense(exampleThemeStorage);
  const isLight = theme === 'light';

  useEffect(() => {
    const cleanupTooltip = initializeTooltip(); // Initialize tooltip

    // Cleanup tooltip on component unmount
    return () => {
      if (cleanupTooltip) cleanupTooltip();
    };
  }, []);

  return (
    <div className={`App ${isLight ? 'bg-slate-50' : 'bg-gray-800'}`}>
      <header className={`App-header ${isLight ? 'text-gray-900' : 'text-gray-100'}`}>
        <p>Saige Test Part 21</p>
        <Button onClick={exampleThemeStorage.toggle} theme={theme}>
          931 Sperling Ave
        </Button>
      </header>
    </div>
  );
};

export default withErrorBoundary(withSuspense(NewTab, <div> Loading ... </div>), <div> Error Occur </div>);
