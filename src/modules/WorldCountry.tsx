import React, { FC, useState } from 'react';
import worldCapitals from './worldCapitals.json';
import Module from './Module';
import { ModuleProps } from './props';

const WorldCountry: FC<ModuleProps> = ({ onComplete, showAnswer }) => {
  const [randomIndex] = useState(
    Math.floor(Math.random() * worldCapitals.length),
  );

  return (
    <Module
      prompt="Identify the Country"
      answer={worldCapitals[randomIndex].country}
      text={worldCapitals[randomIndex].capital}
      onComplete={onComplete}
      textClassName="text-3xl"
      showAnswer={showAnswer}
    />
  );
};

export default WorldCountry;
