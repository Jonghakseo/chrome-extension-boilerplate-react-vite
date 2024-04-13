import React from 'react';
import Body from '../../components/body/Body';
import Navbar from '../../components/nav/Navbar';
import { useEthereum } from '@root/src/shared/providers/EthereumContext';
import { useEffect } from 'react';

const App: React.FC = () => {
  const { isConnected, connectToMetaMask } = useEthereum();
  console.log('isConnected', isConnected);

  useEffect(() => {
    if (!isConnected) {
      connectToMetaMask();
    }
  }, []);

  return (
    <div className="min-h-screen bg-background2">
      <Navbar />
      <Body />
    </div>
  );
};

export default App;
