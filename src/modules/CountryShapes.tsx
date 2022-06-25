import React, { FC, useState } from 'react';
import countryShapes from './countryShapes.json';
import Module from './Module';
import { ModuleProps } from './props';

const CountryShapes: FC<ModuleProps> = ({ onComplete, showAnswer }) => {
  const [randomIndex] = useState(
    Math.floor(Math.random() * countryShapes.length),
  );

  return (
    <Module
      prompt="Identify the Country"
      answer={countryShapes[randomIndex].name}
      text={
        <img
          alt=""
          src={`/countrySvgs/${countryShapes[randomIndex].key}.svg`}
          width="150"
          className="inline-flex m-0"
        />
      }
      onComplete={onComplete}
      textClassName="text-3xl"
      showAnswer={showAnswer}
    />
  );
};

export default CountryShapes;
