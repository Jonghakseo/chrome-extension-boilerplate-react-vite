import React from 'react';
import { ChildProps } from 'child-props';

const Child: React.FC<ChildProps> = ({ text }) => {
  return <h1>{text}</h1>;
};

export default Child;
