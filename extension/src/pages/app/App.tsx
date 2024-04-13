import React from 'react';
import Main from '../../components/main/Main';
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
    <>
      <Navbar />

      <div className="width-full bg-red-600 flex justify-center items-center">
        <div className="w-2/4	 text-center	">
          <h1 className="text-xl font-bold	">Password Manager</h1>
          <Main />
        </div>
      </div>
    </>
  );
};

export default Options;
