import React, { useState } from 'react';
import UpdateModal from '../modals/UpdateModal';
import DeleteModal from '../modals/DeleteModal';

const Accordion: React.FC = () => {
  const dummyData = [
    {
      name: 'FaceBook',
      value: '*********',
    },
    {
      name: 'Instagram',
      value: '**********',
    },
    {
      name: 'Github',
      value: '************',
    },
    {
      name: 'MetaMask',
      value: '*********',
    },
  ];

  const [secrets, setSecrets] = useState(dummyData);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [secretToUpdate, setSecretToUpdate] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [secretToDelete, setSecretToDelete] = useState(null);

  const handleUpdateClick = secret => {
    setSecretToUpdate('dummy');
    console.log('isUpdateModalOpen changed to:', !isUpdateModalOpen);
    setIsUpdateModalOpen(true);
  };

  const handleDeleteClick = secret => {
    setSecretToDelete('dummy');
    console.log('isDeleteModalOpen changed to:', !isDeleteModalOpen);
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      {secrets.map((secret, index) => (
        <div
          className="collapse collapse-arrow bg-background2 border-solid border-[0.5px] my-2 border-text2"
          key={index}>
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">{secret.name}</div>

          <div className="collapse-content">
            <div className="w-full flex justify-center gap-20">
              <div className="flex py-2 px-5 w-3/6 rounded-md ml-2.5 bg-text3">{secret.value}</div>

              <div className=" width-full flex gap-10 items-end">
                <button
                  onClick={() => handleUpdateClick('dummy')}
                  className="btn  btn-sm rounded-xl text-primary1 border-solid border-0.25 border-text2">
                  Update
                </button>

                <button
                  onClick={() => handleDeleteClick('dummy')}
                  className="btn  btn-sm rounded-xl text-primary1 border-solid border-0.25 border-text2">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
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
