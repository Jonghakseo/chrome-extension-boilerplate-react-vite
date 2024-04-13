import { useEthereum } from '@src/shared/providers/EthereumContext';
import Blockies from 'react-blockies';

const ConnectedWallet = () => {
  const { disconnect, connectedAddress } = useEthereum();

  return (
    <div className="flex justify-center items-center h-6 gap-3">
      <Blockies
        seed={connectedAddress}
        size={10}
        scale={3}
        color="#dfe"
        bgColor="#ffe"
        spotColor="#abc"
        className="rounded mr-1.5"
      />
      <div className="h-full flex items-center bg-base-200 px-4 rounded-lg border-gray-500 border ">
        <p className="">
          {connectedAddress.substring(0, 6)}...{connectedAddress.slice(connectedAddress.length - 4)}
        </p>
      </div>
      <button onClick={disconnect} className="btn h-full btn-error uppercase btn-xs text-xs">
        Disconnect
      </button>
    </div>
  );
};

export default ConnectedWallet;
