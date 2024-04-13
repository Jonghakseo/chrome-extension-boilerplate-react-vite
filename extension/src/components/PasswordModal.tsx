import { useState } from 'react';
import { useEthereum } from '@src/shared/providers/EthereumContext';
import { useEffect } from 'react';
import { Ref } from 'react';
import { getStorageContract } from '@root/utils/utils';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  input: Ref<HTMLInputElement>;
  password: string;
}

function PasswordModal({ isOpen, setIsOpen, input, password }: ModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [positionClasses, setPositionClasses] = useState('');
  const [modalStyle, setModalStyle] = useState({});

  //@ts-ignore
  console.log(input);

  console.log('Password Modal is alive');

  const { signer, connectToMetaMask, isConnected } = useEthereum();

  useEffect(() => {
    //@ts-ignore
    if (isOpen && input.current) {
      //@ts-ignore
      const rect = input.current.getBoundingClientRect();
      const top = rect.top + rect.height + window.scrollY + 10; // 10px below the input
      const left = rect.left + window.scrollX;
      //   const left = rect.left + window.scrollX;
      const topStyle = `top-[${top}px]`;
      const leftStyle = `left-[${left}px]`;

      console.log(topStyle, leftStyle);

      setPositionClasses(`${topStyle} ${leftStyle}`);

      setModalStyle({
        top: `${rect.top + rect.height + window.scrollY + 10}px`, // 10px below the input
        left: `${rect.left + window.scrollX}px`,
        position: 'absolute',
        zIndex: 1000, // Ensure it's above most content
      });
    }
  }, []);

  const store = async () => {
    setIsLoading(true);
    if (!isConnected) {
      await connectToMetaMask();
    } else {
      storeSecret();
    }
  };

  const storeSecret = async () => {
    setIsLoading(true);

    const domainName = window.location.hostname;
    console.log(domainName);

    const contract = getStorageContract(signer);
    const tx = await contract?.setSecret(domainName, password);
    console.log('TX:', tx);
    const txReceipt = await tx.wait();
    console.log('Transaction Receipt:', txReceipt);

    if (txReceipt.status === 1) {
      console.log('Secret stored successfully.');
      const response = await chrome.runtime.sendMessage({
        action: 'addSecretToMemory',
        secret: { domain: domainName, value: password },
      });
      console.log('Response:', response);
    }

    setIsLoading(false);
    setIsOpen(false);
    //@ts-ignore
    input.current.value = password;
  };

  useEffect(() => {
    if (signer) {
      storeSecret();
    }
  }, [signer]);

  return (
    <div>
      {modalStyle && (
        <div style={modalStyle} className={` bg-white rounded shadow-lg p-6 text-black w-full max-w-md`}>
          <h2 className="text-xl font-bold mb-4">Save Password</h2>
          <p>{password}</p>
          <div className="mt-4 flex justify-between">
            <button
              onClick={() => setIsOpen(false)}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
              Close
            </button>
            <button
              onClick={store}
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              {isLoading ? 'Storing...' : 'Store'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PasswordModal;
