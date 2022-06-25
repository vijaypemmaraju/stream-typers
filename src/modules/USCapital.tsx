import React, { FC, useState } from 'react';
import usCapitals from './usCapitals.json';
import Module from './Module';
import { ModuleProps } from './props';

const USCapital: FC<ModuleProps> = ({ onComplete, showAnswer }) => {
  const [randomIndex] = useState(Math.floor(Math.random() * usCapitals.length));

  return (
    <Module
      prompt="Identify the US Capital"
      answer={usCapitals[randomIndex].capital}
      text={usCapitals[randomIndex].state}
      onComplete={onComplete}
      textClassName="text-3xl"
      showAnswer={showAnswer}
    />
  );
};

export default USCapital;
