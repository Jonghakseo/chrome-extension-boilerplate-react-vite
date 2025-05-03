import { t } from '@extension/i18n';

export const ErrorStackTraceList = ({ error }: { error?: Error }) => (
  <div className="bg-white shadow overflow-hidden rounded-lg">
    <div className="px-4 py-5 sm:p-6">
      <div className="text-sm text-gray-500">
        <p className="font-medium text-gray-700 mb-2">{t('displayErrorDetailsInfo')}</p>
        <div className="bg-red-50 p-4 rounded-md overflow-auto">
          <p className="text-red-700 font-mono break-all">{error?.message || t('displayErrorUnknownErrorInfo')}</p>
          {error?.stack && (
            <details className="mt-3">
              <summary className="text-sm text-red-700 cursor-pointer">Stack trace</summary>
              <pre className="mt-2 text-xs text-red-800 overflow-auto p-2">{error?.stack}</pre>
            </details>
          )}
        </div>
      </div>
    </div>
  </div>
);
