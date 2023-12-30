import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    console.log('injected content view loaded');
  }, []);

  return <div className="">injected content view</div>;
}
