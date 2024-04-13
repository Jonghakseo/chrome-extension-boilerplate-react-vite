import { useEthereum } from '@src/shared/providers/EthereumContext';

const ConnectWallet = () => {
  const { connectToMetaMask } = useEthereum();

  return (
    <div className="flex justify-center items-center h-6 gap-3">
      <button onClick={connectToMetaMask} className="btn h-full btn-accent uppercase btn-sm text-xs">
        Connect
      </button>
    </div>
  );
};

export default ConnectWallet;
