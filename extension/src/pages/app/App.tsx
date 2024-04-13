import React from 'react';
import Body from '../../components/body/Body';
import Navbar from '../../components/nav/Navbar';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-background2">
      <Navbar />
      <Body />
    </div>
  );
};

export default App;
