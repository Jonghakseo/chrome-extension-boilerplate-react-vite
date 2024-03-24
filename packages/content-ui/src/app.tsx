import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    console.log('content ui loaded');
  }, []);

  return <div className="">content view</div>;
}
