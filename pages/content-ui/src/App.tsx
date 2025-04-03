import { t } from '@extension/i18n';
import { ToggleButton } from '@extension/ui';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    console.log('content ui loaded');
  }, []);

  return (
    <div className="flex items-center justify-between gap-2 rounded bg-blue-100 px-2 py-1">
      <div className="flex gap-1 text-blue-500">
        Edit <strong className="text-blue-700">pages/content-ui/src/app.tsx</strong> and save to reload.
      </div>
      <ToggleButton>{t('toggleTheme')}</ToggleButton>
    </div>
  );
}
