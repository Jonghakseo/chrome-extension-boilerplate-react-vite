import { Disclosure } from '@headlessui/react';
import Blockies from 'react-blockies';
import Logo from '../../assets/img/blocklock_logo.svg';

export default function Navbar() {
  return (
    <Disclosure as="nav">
      <div className="mx-auto w-fill px-10 w-full bg-background2">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
          <div className="flex flex-1 items-left justify-left">
            <img className="h-8 w-auto" src={Logo} alt="Blocklock" />
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            <Blockies
              seed="Jeremy"
              size={10}
              scale={3}
              color="#dfe"
              bgColor="#ffe"
              spotColor="#abc"
              className="rounded mr-1.5"
            />
            <p className="rounded-sm">0x522dy28..</p>
          </div>
        </div>
      </div>
    </Disclosure>
  );
}
