import { ComponentType, ReactElement, Suspense } from 'react';

export default function withSuspense<T extends Record<string, unknown>>(
  Component: ComponentType<T>,
  SuspenseComponent: ReactElement,
) {
  return function WithSuspense(props: T) {
    return (
      <Suspense fallback={SuspenseComponent}>
        <Component {...props} />
      </Suspense>
    );
  };
}
