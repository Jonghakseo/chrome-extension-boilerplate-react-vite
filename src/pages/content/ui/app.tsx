import { useEffect } from 'react';
import Child from '@content/ui/child';

export default function App() {
  useEffect(() => {
    console.log('content view loaded');
  }, []);

  return (
    <div className="check-here">
      <Child text={'injected React component!'} />
    </div>
  );
}
