import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    console.log('content ui loaded');
  }, []);

  return (
    <div>
      Edit <code>pages/content-ui/src/app.tsx</code> and save to reload.
    </div>
  );
}
