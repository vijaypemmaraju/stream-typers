import React, { FC, useState } from 'react';
import trivia from './trivia.json';
import Module from './Module';
import { ModuleProps } from './props';

const unescape = (str: string) =>
  str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");

const Trivia: FC<ModuleProps> = ({ onComplete, showAnswer }) => {
  const [randomRiddleIndex] = useState(
    Math.floor(Math.random() * trivia.length),
  );

  console.log(trivia[randomRiddleIndex].answer.toString());

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
