import React, { useState } from 'react';
import UpdateModal from '../modals/UpdateModal';
import DeleteModal from '../modals/DeleteModal';
import { json } from 'stream/consumers';
import { useSecrets } from '@root/src/shared/providers/SecretsContext';

const Accordion = () => {
  const { secrets, addSecret } = useSecrets();

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [secretToUpdate, setSecretToUpdate] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [secretToDelete, setSecretToDelete] = useState(null);
  const [visibleSecrets, setVisibleSecrets] = useState(
    secrets.reduce((acc, secret, idx) => {
      acc[idx] = false; // Initialize all secrets as not visible
      return acc;
    }, {}),
  );

  const copyToClipboard = async text => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Password copied to clipboard!'); // Optionally, replace this with a more subtle notification
    } catch (err) {
      alert('Failed to copy password. Please try again!'); // Optionally, handle this error more gracefully
    }
  };

  const handleUpdateClick = secret => {
    setSecretToUpdate(secret);
    console.log('isUpdateModalOpen changed to:', !isUpdateModalOpen);
    setIsUpdateModalOpen(true);
  };

  const handleDeleteClick = secret => {
    setSecretToDelete(secret);
    console.log('isDeleteModalOpen changed to:', !isDeleteModalOpen);
    setIsDeleteModalOpen(true);
  };

  const toggleVisibility = index => {
    console.log(JSON.stringify(visibleSecrets));
    setVisibleSecrets(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <>
      <div className="border-solid border-[0.5px] my-2 border-background4  bg-background3 rounded-lg">
        {secrets.map((secret, index) => (
          // <div className={`border-b-2 border-background4 ${index === secrets.length - 1 ? '' : ''}`}>
          <div className="collapse collapse-arrow" key={index}>
            <input type="checkbox" />
            <div className="flex collapse-title text-xl font-medium gap-2">
              <img src={`https://${secret.domain}/favicon.ico`} className="max-w-5 max-h-5 my-1" />
              {secret.domain.replace(/^www\./, '')}
            </div>
            <div className="collapse-content">
              <div className="w-full flex justify-between">
                <div className="flex justify-between items-center py-2 px-4 w-1/2 rounded-md bg-text3">
                  {visibleSecrets[index] ? secret.value : '********'}
                  <span className="space-x-1">
                    <button
                      onClick={() => {
                        toggleVisibility(index);
                      }}
                      className="hover:bg-primary2 hover:text-background3 p-1 rounded-lg">
                      <i className="fa-light fa-eye w-4 h-4"></i>
                    </button>
                    <button
                      onClick={() => copyToClipboard(secret.value)}
                      className="hover:bg-primary2 hover:text-background3 p-1 rounded-lg">
                      <i className="fa-regular fa-copy w-4 h-4"></i>
                    </button>
                  </span>
                </div>
                <div className="width-full flex gap-10 items-end">
                  <button
                    onClick={() => handleUpdateClick(secret.domain)}
                    className="whitespace-nowrap flex justify-between w-full h-full text-primary1 hover:bg-primary2 hover:text-background3 focus:ring-4 focus:ring-primary2 border border-solid border-0.25 border-text2 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none">
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteClick(secret.domain)}
                    className="whitespace-nowrap flex justify-between w-full h-full text-primary1 hover:bg-primary2 hover:text-background3 focus:ring-4 focus:ring-primary2 border border-solid border-0.25 border-text2 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          // </div>
        ))}
      </div>
      {isUpdateModalOpen && (
        <UpdateModal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          secretDomain={secretToUpdate} // Pass the secret data
        />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          secretDomain={secretToDelete} // Pass the secret data
        />
      )}
    </>
  );
};

export default Accordion;
