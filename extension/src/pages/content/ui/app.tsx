import React, { useEffect, useRef, useState } from 'react';
import CreatePasswordModal from '@root/src/components/modals/CreatePasswordModal';
import BlockLockFavicon from '../../../assets/img/blocklock_favicon_2.svg';
import { generateRandomPassword } from '@root/utils/utils';
import SuggestPasswordModal from '@root/src/components/modals/SuggestPasswordModal';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const [randomPassword, setRandomPassword] = useState(generateRandomPassword());
  const [savedPassword, setSavedPassword] = useState(null);

  const updateIconPosition = (input, icon) => {
    const rect = input.getBoundingClientRect();
    const blocklockIconHeight = rect.height * 0.8;
    icon.style.width = `${blocklockIconHeight}px`;
    icon.style.height = `${blocklockIconHeight}px`;
    icon.style.top = `${rect.top + window.scrollY + (rect.height - blocklockIconHeight) / 2}px`;
    icon.style.left = `${rect.left + window.scrollX + rect.width - blocklockIconHeight - 10}px`;
  };

  const appendPasswordInput = () => {
    const passwordInputs = Array.from(document.querySelectorAll('input[type="password"]'));
    console.log('password inputs: ', passwordInputs);
    passwordInputs.forEach(input => {
      const blocklockIcon = document.createElement('img');
      blocklockIcon.src = BlockLockFavicon;
      blocklockIcon.style.cssText =
        'position: absolute; z-index:750; display: flex; align-items: center; justify-content: center;';
      document.body.appendChild(blocklockIcon);

      updateIconPosition(input, blocklockIcon);

      const observer = new ResizeObserver(() => updateIconPosition(input, blocklockIcon));
      observer.observe(input);

      const showSuggestions = event => {
        event.stopPropagation(); // Prevents click from closing modal immediately
        //@ts-ignore
        inputRef.current = input;
        setIsOpen(true);
      };

      input.addEventListener('click', showSuggestions);
      input.addEventListener('focus', showSuggestions);
    });
  };

  useEffect(() => {
    const checkForSavedSecret = async () => {
      const response = await chrome.runtime.sendMessage({ action: 'getSecret', domain: window.location.hostname });
      if (response?.success) {
        setSavedPassword(response.secret);
      }
    };

    const handleClickOutside = event => {
      const targetId = event.target.id;

      if (isOpen && !inputRef.current?.contains(event.target) && targetId !== 'blocklock-content-view-root') {
        setIsOpen(false);
      }
    };

    checkForSavedSecret();

    document.addEventListener('click', handleClickOutside);
    window.addEventListener('load', appendPasswordInput);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('load', appendPasswordInput);
    };
  }, [isOpen]); // Only re-run if isOpen changes

  //Add event listener to the modal ref

  return (
    <>
      {isOpen &&
        (!savedPassword ? (
          <CreatePasswordModal isOpen={isOpen} setIsOpen={setIsOpen} input={inputRef} password={randomPassword} />
        ) : (
          <SuggestPasswordModal isOpen={isOpen} setIsOpen={setIsOpen} input={inputRef} password={savedPassword} />
        ))}
    </>
  );
}
