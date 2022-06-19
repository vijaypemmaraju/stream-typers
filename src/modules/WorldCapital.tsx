import React, { FC, useState } from 'react';
import worldCapitals from './worldCapitals.json';
import Module from './Module';
import { ModuleProps } from './props';

const WorldCapital: FC<ModuleProps> = ({ onComplete, showAnswer }) => {
  const [randomIndex] = useState(
    Math.floor(Math.random() * worldCapitals.length),
  );

  return (
    <Module
      prompt="Identify the Capital"
      answer={worldCapitals[randomIndex].capital}
      text={worldCapitals[randomIndex].country}
      onComplete={onComplete}
      showAnswer={showAnswer}
    />
  );
};

export default WorldCapital;
