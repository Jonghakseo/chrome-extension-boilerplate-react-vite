import { useState, useEffect } from 'react';
import { useEthereum } from '@src/shared/providers/EthereumContext';
import { Ref } from 'react';
import { getStorageContract } from '@root/utils/utils';
import CheckedIcon from '../images/CheckedIcon';
import BlockLockLogo from '../images/BlockLockLogo';
import UpRightIcon from '../images/UpRightIcon';
import InformationIcon from '../images/InformationIcon';
import { forwardRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  input: any;
  password: string;
}
function CreatePasswordModal({ isOpen, setIsOpen, input, password }: ModalProps) {
  const [isPending, setIsPending] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
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

      setModalStyle({
        top: `${rect.top + rect.height + window.scrollY + 10}px`, // 10px below the input
        left: `${rect.left + window.scrollX}px`,
        position: 'absolute',
        zIndex: 1000, // Ensure it's above most content
      });
    }
  }, []);

  const store = async () => {
    console.log('calling store');
    console.log('Are we connected?', isConnected);
    console.log('Signer', signer);
    if (!isConnected) {
      await connectToMetaMask();
    } else {
      storeSecret();
    }
  };

  const storeSecret = async () => {
    setIsPending(true);

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

    setIsPending(false);
    setIsConfirmed(true);

    setTimeout(() => {
      setIsOpen(false);
    }, 3000);

    //@ts-ignore
    if (input.current) {
      input.current.value = password; // Set the value directly

      // Create a new 'input' event
      const eventInput = new Event('input', { bubbles: true });
      // Create a new 'change' event
      const eventChange = new Event('change', { bubbles: true });

      // Dispatch it
      input.current.dispatchEvent(eventInput);
      input.current.dispatchEvent(eventChange);

      // Optionally focus and blur to ensure all interactions are captured
      input.current.focus();
      input.current.blur();
    }
  };

  useEffect(() => {
    connectToMetaMask();
  }, []);

  return (
    <div>
      {modalStyle && (
        <div style={modalStyle}>
          <div
            className={` bg-background2 flex flex-col rounded-t-lg ${!isPending && 'rounded-b-lg'} shadow-lg p-6 w-[440px]`}>
            <div className="flex justify-between">
              <h3 className="text-text2 text-sm whitespace-nowrap">Use suggested password</h3>
              <BlockLockLogo classList={'w-16 fill-text3'} />
            </div>
            <div className="py-2 flex justify-between gap-2 w-full">
              <div className="w-3/5">
                <div className="bg-background5 rounded text-[#D9EEF3] py-2 px-4 w-full flex  items-center">
                  {password}
                </div>
              </div>
              <div className="w-2/5">
                {!isPending && !isConfirmed ? (
                  <button
                    className="text-background2 whitespace-nowrap flex items-center justify-between w-full h-full bg-primary1 hover:bg-primary2 focus:ring-4 focus:ring-primary2 font-medium rounded text-sm px-5 py-2 focus:outline-none"
                    onClick={() => {
                      store();
                    }}>
                    Save on-chain
                    <div className="flex justify-center items-center h-4 my-auto">
                      <UpRightIcon classList={'w-6 fill-background2 h-full'} />
                    </div>
                  </button>
                ) : isPending ? (
                  <div className="flex items-center justify-between px-2 py-2 h-full my-auto w-full">
                    <div className="text-text1 text-sm flex items-center justify-center gap-6 w-full">
                      <span className="align-middle">Processing... </span>
                      <span className="loading loading-spinner "></span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between px-5 py-2 h-full my-auto w-full">
                    <div className="text-primary1 whitespace-nowrap text-sm flex justify-between items-center gap-6 w-full">
                      <span>Saved</span>
                      <CheckedIcon classList="w-5 fill-primary1" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {isPending && (
            <div className="flex px-6 py-2 gap-4 bg-background4 rounded-b-lg text-text2 text-sm">
              <InformationIcon classList="w-3 fill-text2" />
              <span>This can take 15-30 seconds</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CreatePasswordModal;
