import { t } from '@extension/i18n';

// FIXME: IMPORT SVG ICON INSTEAD OF DEFINING INLINE IT HERE
const WarningIcon = ({ className }: { className: string }) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    />
  </svg>
);

export const ErrorHeader = () => (
  <div className="text-center">
    <WarningIcon className={'mx-auto h-24 w-24 text-red-500'} />
    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">{t('displayErrorInfo')}</h2>
    <p className="mt-2 text-sm text-gray-600">{t('displayErrorDescription')}.</p>
  </div>
);
