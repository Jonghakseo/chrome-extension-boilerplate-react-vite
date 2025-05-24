import { t } from '@extension/i18n';

export const ErrorStackTraceList = ({ error }: { error?: Error }) => (
  <div className="overflow-hidden rounded-lg bg-white shadow">
    <div className="px-4 py-5 sm:p-6">
      <div className="text-sm text-gray-500">
        <p className="mb-2 font-medium text-gray-700">{t('displayErrorDetailsInfo')}</p>
        <div className="overflow-auto rounded-md bg-red-50 p-4">
          <p className="break-all font-mono text-red-700">{error?.message || t('displayErrorUnknownErrorInfo')}</p>
          {error?.stack && (
            <details className="mt-3">
              <summary className="cursor-pointer text-sm text-red-700">Stack trace</summary>
              <pre className="mt-2 overflow-auto p-2 text-xs text-red-800">{error?.stack}</pre>
            </details>
          )}
        </div>
      </div>
    </div>
  </div>
);
