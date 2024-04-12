import React from 'react';
import GenericModal from './GenericModal';

interface UpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  secretDomain: string;
}

const UpdateModal: React.FC<UpdateModalProps> = ({ isOpen, onClose, secretDomain }) => {
  return (
    <GenericModal isOpen={isOpen} onClose={onClose} title="Update Item">
      <div>This is a thing</div>
    </GenericModal>
  );
};

export default UpdateModal;
