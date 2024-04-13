import { useEffect } from 'react';
import { generateRandomPassword } from '@root/utils/utils';
import PasswordModal from '@root/src/components/modals/PasswordModal';
import BlockLockFavicon from '../../../assets/img/blocklock_favicon_2.svg';
import { useState } from 'react';
import { useRef } from 'react';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [randomPassword, setRandomPassword] = useState<string>(generateRandomPassword());
  const [positionClasses, setPositionClasses] = useState('');

  const appendPasswordInput = () => {
    console.log('Looking for password inputs');
    const passwordInputs: HTMLInputElement[] = Array.from(
      document.querySelectorAll('input[type="password"]'),
    ) as HTMLInputElement[];

    passwordInputs.forEach(input => {
      // Create the password suggestion button (🔑)
      const blocklockIcon = document.createElement('img');
      blocklockIcon.src = BlockLockFavicon;

      blocklockIcon.style.cssText =
        'position: absolute; z-index:750; display: flex; align-items: center; justify-content: center;';

      const rect = input.getBoundingClientRect();

      const blocklockIconHeight = rect.height * 0.6;
      blocklockIcon.style.width = `${blocklockIconHeight}px`;
      blocklockIcon.style.height = `${blocklockIconHeight}px`;

      blocklockIcon.style.top = `${rect.top + window.scrollY + (rect.height - blocklockIconHeight) / 2}px`;
      blocklockIcon.style.left = `${rect.left + window.scrollX + rect.width - blocklockIconHeight - 10}px`; // 5px padding from the right

      document.body.appendChild(blocklockIcon);

      const showSuggestions = () => {
        inputRef.current = input;
        setIsOpen(true);
      };

      input.addEventListener('click', showSuggestions);
      input.addEventListener('focus', showSuggestions);
      // input.addEventListener('blur', hideSuggestions);

      // Hide elements when clicking outside the input or suggestion div
      // document.addEventListener('click', event => {
      //   if (!input.contains(event.target as Node) && !passwordSuggestionDiv.contains(event.target as Node)) {
      //     hideSuggestions();
      //   }
      // });
    });
  };

  useEffect(() => {
    console.log("We're in the effect");
    const onLoad = () => {
      appendPasswordInput();
      window.removeEventListener('load', onLoad);
    };

    if (document.readyState === 'complete') {
      appendPasswordInput();
    } else {
      window.addEventListener('load', onLoad);
    }
  }, []);

  return (
    <>{isOpen && <PasswordModal isOpen={isOpen} setIsOpen={setIsOpen} input={inputRef} password={randomPassword} />}</>
  );
}
