import { ErrorBoundary } from 'react-error-boundary';
import type { ComponentType } from 'react';
import type { FallbackProps } from 'react-error-boundary';

export const withErrorBoundary = <T extends Record<string, unknown>>(
  Component: ComponentType<T>,
  FallbackComponent: ComponentType<FallbackProps>,
) =>
  function WithErrorBoundary(props: T) {
    return (
      <ErrorBoundary FallbackComponent={FallbackComponent}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
