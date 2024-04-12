import React from 'react';
import Main from '../../components/main/Main';
import Navbar from '../../components/nav/Navbar'

const Options: React.FC = () => {
  return (
    <>
    <Navbar/>
      
      <div className="width-full bg-red-600 flex justify-center items-center" >
        
        <div className='w-2/4	 text-center	'>
        
      <h1 className='text-xl font-bold	'>Password Manager</h1>
        <Main />
        </div>
      </div>
    </>
  );
};

export default Options;
