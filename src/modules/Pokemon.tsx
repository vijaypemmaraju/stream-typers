import React, { FC, useState } from 'react';
import pokemon from './pokemon.json';
import Module from './Module';
import { ModuleProps } from './props';

const Pokemon: FC<ModuleProps> = ({ onComplete, showAnswer }) => {
  const [randomRiddleIndex] = useState(
    Math.floor(Math.random() * pokemon.length),
  );

  return (
    <Module
      prompt="Identify the Pokémon"
      answer={pokemon[randomRiddleIndex].answer.toString()}
      text={pokemon[randomRiddleIndex].question}
      onComplete={onComplete}
      showAnswer={showAnswer}
    />
  );
};

export default Pokemon;
