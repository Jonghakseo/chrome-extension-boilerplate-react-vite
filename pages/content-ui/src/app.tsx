import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    console.log('content ui loaded');
  }, []);

  return (
    <div className="flex gap-1 text-blue-500">
      Edit <strong>pages/content-ui/src/app.tsx</strong> and save to reload.
    </div>
  );
}
