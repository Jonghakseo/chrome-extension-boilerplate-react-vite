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
        <div className="collapse collapse-arrow bg-base-200 my-0.5	" key={index}>
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">{secret.name}</div>

          <div className="collapse-content">
            <div className="w-full flex justify-center gap-20">
              <div className="border border-white py-2 px-5">{secret.value}</div>

              <div>
                <button onClick={() => handleUpdateClick('dummy')} className="btn btn-primary">
                  Edit
                </button>

                <button onClick={() => handleDeleteClick('dummy')} className="btn btn-primary">
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
