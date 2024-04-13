import React from 'react';
import GenericModal from './GenericModal';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  secretDomain: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, secretDomain }) => {
  return (
    <GenericModal isOpen={isOpen} onClose={onClose} title="Delete Item">
      <div>This is a thing</div>
    </GenericModal>
  );
};

export default DeleteModal;
