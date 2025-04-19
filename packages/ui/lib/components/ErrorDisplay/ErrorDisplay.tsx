import { ErrorHeader } from '@/lib/components/ErrorDisplay/ErrorHeader';
import { ErrorResetButton } from '@/lib/components/ErrorDisplay/ErrorResetButton';
import { ErrorStackTraceList } from '@/lib/components/ErrorDisplay/ErrorStackTraceList';

export const ErrorDisplay = ({ error, resetErrorBoundary }: { error?: Error; resetErrorBoundary?: () => void }) => (
  <div className="flex items-center justify-center bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
      <ErrorHeader />
      <ErrorStackTraceList error={error} />
      <ErrorResetButton resetErrorBoundary={resetErrorBoundary} />
    </div>
  </div>
);
