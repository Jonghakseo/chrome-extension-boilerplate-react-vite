import React, { useState, useRef } from 'react';
import GenericModal from './GenericModal';
import { useEthereum } from '@src/shared/providers/EthereumContext';
import { getStorageContract } from '@root/utils/utils';

interface UpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  secretDomain: string;
}

const UpdateModal: React.FC<UpdateModalProps> = ({ isOpen, onClose, secretDomain }) => {
  const { signer, connectToMetaMask, isConnected } = useEthereum();
  const [isPending, setIsPending] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [inputError, setInputError] = useState('');
  const inputRef = useRef(null);

  const store = async () => {
    console.log('hit store');
    if (!isConnected) {
      await connectToMetaMask();
    } else {
      storeSecret();
    }
  };

  const storeSecret = async () => {
    console.log('hit storeSecret');

    const contract = getStorageContract(signer);
    const password = inputRef.current.value;
    if (password.length > 8) {
      // Update minimum length as needed
      setInputError('Password must be at least 8 characters long');
      return; // Prevent further execution if there's an error
    } else {
      setInputError(''); // Clear error state if valid
    }

    console.log('Password:', password);
    setIsPending(true);
    const tx = await contract?.setSecret(secretDomain, password);
    console.log('TX:', tx);
    const txReceipt = await tx.wait();
    console.log('Transaction Receipt:', txReceipt);

    if (txReceipt.status === 1) {
      console.log('Secret stored successfully.');
      const response = await chrome.runtime.sendMessage({
        action: 'addSecretToMemory',
        secret: { domain: secretDomain, value: password },
      });
      console.log('Response:', response);
    }

    setIsPending(false);
    setIsConfirmed(true);

    //@ts-ignore
    input.current.value = password;
  };

  // useEffect(() => {
  //   console.log('signer', signer);
  //   if (signer) {
  //     storeSecret();
  //   }
  // }, [signer]);

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Update password for: ${secretDomain.replace(/^www\./, '')}`}>
      <div className="pt-6">Password</div>
      <div className="pt-4 pb-6 w-full">
        <label className="input py-2 h-10 w-full rounded-md bg-text3">
          <input type="text" className="" placeholder="Password" ref={inputRef} />
          <i className="fa-regular fa-lock w-4 h-4"></i>
        </label>
        {inputError && <p className="text-red-500 text-xs pt-2">{inputError}</p>}
      </div>
      <div className="flex justify-between gap-4">
        <button
          className="whitespace-nowrap flex items-center justify-center text-center w-full h-full text-primary1 hover:bg-primary2 hover:text-background3 focus:ring-4 focus:ring-primary2 border border-solid border-0.25 border-background5 font-medium rounded text-sm px-5 py-2 focus:outline-none"
          onClick={() => {
            onClose();
          }}>
          Cancel
        </button>
        {!isPending && !isConfirmed ? (
          <button
            className="text-background2 whitespace-nowrap flex items-center justify-between w-full h-full bg-primary1 hover:bg-primary2 focus:ring-4 focus:ring-primary2 font-medium rounded text-sm px-5 py-2 focus:outline-none"
            onClick={() => {
              store();
            }}>
            Update on-chain
            <div className="flex justify-center items-center h-4 my-auto">
              <i className="fa-regular fa-lock w-4 h-4"></i>
            </div>
          </button>
        ) : isPending ? (
          <div className="flex items-center justify-between px-2 py-2 h-full my-auto w-full">
            <div className="text-text1 text-sm flex items-center justify-center gap-6 w-full">
              <span className="align-middle">Processing... </span>
              <span className="loading loading-spinner"></span>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between px-5 py-2 h-full my-auto w-full">
            <div className="text-primary1 whitespace-nowrap text-sm flex justify-between items-center gap-6 w-full">
              <span>Saved</span>
              <i className="fa-duotone fa-check w-4 h-4"></i>
            </div>
          </div>
        )}
      </div>
    </GenericModal>
  );
};

export default UpdateModal;
