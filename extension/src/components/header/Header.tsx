import React from 'react';
import ConnectWallet from './ConnectWallet';
import { useEthereum } from '@src/shared/providers/EthereumContext';
import ConnectedWallet from './ConnectedWallet';
import Logo from '../../assets/img/blocklock_logo.svg';

const Header = () => {
  const { isConnected } = useEthereum();
  return (
    <div className="flex justify-between p-10">
      <div className="flex gap-4 items-center">
        <img src={Logo} alt="BlockLock" className="h-8 w-auto" />
      </div>
      <div className="flex items-center">{isConnected ? <ConnectedWallet /> : <ConnectWallet />}</div>
    </div>
  );
};

export default Header;
