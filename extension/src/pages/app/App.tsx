import React from 'react';
import Main from '../../components/main/Main';
import Navbar from '../../components/nav/Navbar'

const Options: React.FC = () => {
  return (
    <>
    <Navbar/>
      
      <div className="width-full flex justify-center items-center" >
        
        <div className='w-2/4	 	'>
        
      <h1 className='text-xl font-bold	py-8	'>BlockLock Password Manager</h1>
        <Main />
        </div>
      </div>
    </>
  );
};

export default Options;
