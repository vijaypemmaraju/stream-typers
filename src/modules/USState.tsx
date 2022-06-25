import React, { FC, useState } from 'react';
import usCapitals from './usCapitals.json';
import Module from './Module';
import { ModuleProps } from './props';

const USState: FC<ModuleProps> = ({ onComplete, showAnswer }) => {
  const [randomIndex] = useState(Math.floor(Math.random() * usCapitals.length));

  return (
    <Module
      prompt="Identify the US State"
      answer={usCapitals[randomIndex].state}
      text={usCapitals[randomIndex].capital}
      onComplete={onComplete}
      textClassName="text-3xl"
      showAnswer={showAnswer}
    />
  );
};

export default USState;
