import React, { useState } from 'react';
import UpdateModal from '../modals/UpdateModal';
import DeleteModal from '../modals/DeleteModal';

const Accordion: React.FC = () => {
  const dummyData = [
    {
      name: 'namecheap.com',
      value: '*********',
    },
    {
      name: 'openai.com',
      value: '**********',
    },
    {
      name: 'github.com',
      value: '************',
    },
    {
      name: 'dexscreener.com',
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
      <div className="border-solid border-[0.5px] my-2 border-background4  bg-background3 rounded-lg">
        {secrets.map((secret, index) => (
          // <div className={`border-b-2 border-background4 ${index === secrets.length - 1 ? '' : ''}`}>
          <div className="collapse collapse-arrow" key={index}>
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
              <div className='flex content-between gap-5 w-2/4 items-start	align-middle'>
            <img src= {`https://${secret.name}/favicon.ico`} className='max-w-5	 max-h-5 my-1'/> 
            {secret.name}
            </div>
            
            </div>
            <div className="collapse-content">
              <div className="w-full flex justify-between">
                <div className="flex justify-between items-center py-2 px-4 w-1/2 rounded-md bg-text3">
                  {secret.value}
                  <span className="gap-4">
                    <button className="hover:bg-primary2 hover:text-background3 focus:ring-1 focus:ring-primary2 p-1 rounded-lg">
                      <i className="fa-light fa-eye w-4 h-4"></i>
                    </button>
                    <button className="hover:bg-primary2 hover:text-background3 p-1 rounded-lg">
                      <i className="fa-regular fa-copy w-4 h-4"></i>
                    </button>
                  </span>
                </div>
                <div className="width-full flex gap-10 items-end">
                  <button
                    onClick={() => handleUpdateClick('dummy')}
                    className="whitespace-nowrap flex justify-between w-full h-full text-primary1 hover:bg-primary2 hover:text-background3 focus:ring-4 focus:ring-primary2 border border-solid border-0.25 border-text2 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none">
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteClick('dummy')}
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
