import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    console.log('content view runtime loaded');
  }, []);

  return <div className="content-view-text">content view runtime injected</div>;
}
