import { t } from '@extension/i18n';
import { ToggleButton } from '@extension/ui';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    console.log('[CEB] Content ui example loaded');
  }, []);

  return (
    <div className="flex items-center justify-between gap-2 rounded bg-blue-100 px-2 py-1">
      <div className="flex gap-1 text-xs text-blue-500">
        Edit <strong className="text-blue-700">pages/content-ui/src/matches/example/App.tsx</strong> and save to reload.
      </div>
      <ToggleButton className={'mt-0'}>{t('toggleTheme')}</ToggleButton>
    </div>
  );
}
