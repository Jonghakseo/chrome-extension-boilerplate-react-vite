import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    console.log('content view loaded');
  }, []);

  return <div className="">injected content view</div>;
}
