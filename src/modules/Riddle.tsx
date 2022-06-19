import React, { FC, useState } from 'react';
import riddles from './riddles.json';
import Module from './Module';
import { ModuleProps } from './props';

const Riddle: FC<ModuleProps> = ({ onComplete, showAnswer }) => {
  const [randomRiddleIndex] = useState(
    Math.floor(Math.random() * riddles.length),
  );

  const { answer } = riddles[randomRiddleIndex];

  return (
    <Module
      prompt="Solve the Riddle"
      answer={answer}
      text={riddles[randomRiddleIndex].question}
      predicate={message => message === answer.toLowerCase()}
      onComplete={onComplete}
      showAnswer={showAnswer}
    />
  );
};

export default Riddle;
