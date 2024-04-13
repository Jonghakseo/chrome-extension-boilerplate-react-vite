import React from 'react';
import Accordion from '../../components/accordion/Accordion';
import Navbar from '../../components/nav/Navbar';
import { useEthereum } from '@root/src/shared/providers/EthereumContext';
import { useEffect } from 'react';

const Options: React.FC = () => {
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
      <div className="width-full flex justify-center items-center pt-10 bg-background2">
        <div className="w-1/2 text-left">
          <h1 className="text-xl font-bold pb-6">Blocklock Password Manager</h1>
          <Accordion />
        </div>
      </div>
    </div>
  );
};

export default Options;
