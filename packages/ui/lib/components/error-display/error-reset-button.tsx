import { t } from '@extension/i18n';

export const ErrorResetButton = ({ resetErrorBoundary }: { resetErrorBoundary?: () => void }) => (
  <div className="flex items-center justify-center">
    <button
      onClick={resetErrorBoundary}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
      {t('displayErrorReset')}
    </button>
  </div>
);
