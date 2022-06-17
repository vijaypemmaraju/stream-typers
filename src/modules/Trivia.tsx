import React, { FC, useState } from 'react';
import trivia from './trivia.json';
import Module from './Module';
import { ModuleProps } from './props';

const Trivia: FC<ModuleProps> = ({ onComplete, showAnswer }) => {
  const [randomRiddleIndex] = useState(
    Math.floor(Math.random() * trivia.length),
  );

  return (
    <Module
      prompt="Answer the Question"
      answer={trivia[randomRiddleIndex].answer.toString()}
      text={trivia[randomRiddleIndex].question}
      onComplete={onComplete}
      showAnswer={showAnswer}
    />
  );
};

export default Trivia;
