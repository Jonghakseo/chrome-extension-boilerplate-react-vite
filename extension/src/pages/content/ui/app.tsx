import { useEffect } from 'react';
import { generateRandomPassword } from '@root/utils/utils';
import PasswordModal from '@root/src/components/PasswordModal';
import { useState } from 'react';
import { useRef } from 'react';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [randomPassword, setRandomPassword] = useState<string>(generateRandomPassword());
  const [positionClasses, setPositionClasses] = useState('');

  const createPasswordSuggestionDiv = () => {
    const passwordSuggestionDiv = document.createElement('div');
    passwordSuggestionDiv.style.cssText =
      'position: absolute; background-color: #1f2937; color: white; border: 1px solid #ccc; padding: 8px; ' +
      'z-index: 1000; display: none; box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); ' +
      'border-radius: 4px; font-size: 14px; cursor: pointer; transition: background-color 0.3s ease;';

    const passwordSuggestionIcon = document.createElement('div');
    passwordSuggestionIcon.innerText = '🔑';
    passwordSuggestionIcon.style.cssText =
      'font-size: 28px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 8px;'; // Ensures the cursor is a pointer when hovering over the icon

    const passwordSuggestion = document.createElement('div');
    passwordSuggestion.style.cssText =
      'display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; margin-: 10px;';

    const passwordSuggestionTitle = document.createElement('div');
    passwordSuggestionTitle.innerText = 'Use Suggested Password';
    passwordSuggestionTitle.style.cssText =
      'cursor: pointer; font-size: 15px; color: white; font-weight: bold; white-space: nowrap;'; // Ensures the cursor is a pointer when hovering over the title

    const password = document.createElement('div');
    password.innerText = randomPassword;
    password.style.cssText =
      'font-size: 20px; font-weight: bold; margin-top: 10px; cursor: pointer; color: #9ca3af; white-space: nowrap;'; // Ensures the cursor is a pointer when hovering over the password

    passwordSuggestion.appendChild(passwordSuggestionTitle);
    passwordSuggestion.appendChild(password);

    passwordSuggestionDiv.appendChild(passwordSuggestionIcon);
    passwordSuggestionDiv.appendChild(passwordSuggestion);

    // Add hover effect
    passwordSuggestionDiv.addEventListener('mouseover', function () {
      this.style.backgroundColor = '#2563eb'; // Change background color to blue on hover
    });

    passwordSuggestionDiv.addEventListener('mouseout', function () {
      this.style.backgroundColor = '#1f2937'; // Revert background color when not hovering
    });

    return passwordSuggestionDiv;
  };

  const appendPasswordInput = () => {
    console.log('Looking for password inputs');
    const passwordInputs: HTMLInputElement[] = Array.from(
      document.querySelectorAll('input[type="password"]'),
    ) as HTMLInputElement[];

    passwordInputs.forEach(input => {
      // Create the password suggestion button (🔑)

      const passwordSuggestionDiv = createPasswordSuggestionDiv();

      const rect = input.getBoundingClientRect();

      // Position and style the suggestion div
      passwordSuggestionDiv.style.top = `${rect.top + window.scrollY + rect.height + 5}px`; // 5px below the input
      passwordSuggestionDiv.style.left = `${rect.left + window.scrollX}px`;
      passwordSuggestionDiv.style.width = `${rect.width}px`; // Match the input width

      document.body.appendChild(passwordSuggestionDiv);

      const showSuggestions = () => {
        inputRef.current = input;
        setIsOpen(true);
        // passwordSuggestionDiv.style.display = 'flex'; // Show the suggestion div
      };
      const hideSuggestions = () => {
        passwordSuggestionDiv.style.display = 'none'; // Hide the suggestion div
      };

      passwordSuggestionDiv.addEventListener('click', () => {
        console.log('Clicked on suggestion');
        inputRef.current = input;
        console.log(inputRef);
        setIsOpen(true);
        hideSuggestions();
      });

      input.addEventListener('click', showSuggestions);
      input.addEventListener('focus', showSuggestions);
      // input.addEventListener('blur', hideSuggestions);

      // Hide elements when clicking outside the input or suggestion div
      document.addEventListener('click', event => {
        if (!input.contains(event.target as Node) && !passwordSuggestionDiv.contains(event.target as Node)) {
          hideSuggestions();
        }
      });
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
