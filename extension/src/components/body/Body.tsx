import React, { useState, useEffect } from 'react';
import Accordion from '../accordion/Accordion';

const Body: React.FC = () => {
  const getSecrets = async () => {
    // setHiddenSecrets(dummyData.reduce((acc, cur) => ({ ...acc, [cur.domain]: true }), {}));
  };

  return (
    <div className="width-full flex justify-center pt-10">
      <div className="w-1/2 text-left">
        <h1 className="text-xl font-bold pb-6">Blocklock Password Manager</h1>
        <Accordion />
      </div>
    </div>
  );
};

export default Body;
