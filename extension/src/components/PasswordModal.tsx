import { useState } from 'react';
import { useEthereum } from '@src/shared/providers/EthereumContext';
import { useEffect } from 'react';
import { Ref } from 'react';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  input: Ref<HTMLInputElement>;
  password: string;
}

function PasswordModal({ isOpen, setIsOpen, input, password }: ModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  console.log('Password Modal is alive');

  //   const { provider, signer, connectToMetaMask, isConnected } = useEthereum();

  const store = async () => {
    setIsLoading(true);
    //   if (!isConnected) {
    //     await connectToMetaMask();
    //   } else {
    //     storeSecret();
    //   }
  };

  const storeSecret = async () => {};

  //   useEffect(() => {
  //     if (signer) {
  //       storeSecret();
  //     }
  //   }, [signer]);

  return (
    <div id="modal" className="relative z-[900]">
      <div className="fixed inset-0 bg-black/60" />
      <div className="fixed inset-0 flex  items-center justify-center py-4 text-xs md:text-base">
        <div className="card flex flex-col gap-4 bg-gray-800  opacity-100 border border-gray-400 shadow-2xl px-5 py-2 w-full max-w-sm rounded">
          <div className="flex items-center">
            <h2 className="text-4xl">🔑</h2>
            <h2 className="text-white ml-5">Save Password</h2>
          </div>
          <div className="flex rounded-md shadow-lg justify-center items-center w-1/2 mx-auto border py-2 px-4 border-gray-300">
            <p className="text-white ">{password}</p>
          </div>
          <div className="flex  gap-4 justify-center items-center">
            <div className="w-full flex justify-center items-center h-12">
              <button
                onClick={() => setIsOpen(false)}
                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                Close
              </button>
            </div>
            <div className="w-full flex justify-center h-12">
              {isLoading ? (
                <span className="loading text-white loading-spinner"></span>
              ) : (
                <button
                  disabled={isLoading}
                  onClick={store}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Store
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordModal;
