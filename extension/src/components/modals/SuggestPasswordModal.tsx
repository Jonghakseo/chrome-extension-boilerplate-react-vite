import { useState, useEffect } from 'react';
import { useEthereum } from '@src/shared/providers/EthereumContext';
import { Ref } from 'react';
import { getStorageContract } from '@root/utils/utils';
// import BlockLockLogo from '@assets/img/blocklock_logo.svg';
import CheckedIcon from '../images/CheckedIcon';
import BlockLockLogo from '../images/BlockLockLogo';
import UpRightIcon from '../images/UpRightIcon';
import UpArrowIcon from '../images/UpArrowIcon';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  input: any;
  password: string;
}
function SuggestPasswordModal({ isOpen, setIsOpen, input, password }: ModalProps) {
  const [modalStyle, setModalStyle] = useState({});

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

  const useSuggestedPassword = async () => {
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

      setIsOpen(false);
    }
  };

  return (
    <div>
      {modalStyle && (
        <div style={modalStyle}>
          <div className={` bg-background2 flex justify-between rounded-lg shadow-lg p-6 w-[220px]`}>
            <BlockLockLogo classList={'w-16 fill-text3'} />
            <button
              className="text-background2 whitespace-nowrap flex items-center justify-between  h-full bg-primary1 hover:bg-primary2 focus:ring-4 focus:ring-primary2 font-medium rounded text-sm px-5 py-2 focus:outline-none"
              onClick={() => {
                useSuggestedPassword();
              }}>
              Insert Password
              <div className="flex justify-center items-center h-4 my-auto">
                <UpArrowIcon classList={'w-6 fill-background2 h-full'} />
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SuggestPasswordModal;
