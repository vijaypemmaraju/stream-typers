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
    Math.floor(Math.random() * trivia.results.length),
  );

  return (
    <Module
      prompt="Answer the Question"
      answer={trivia.results[randomRiddleIndex].correct_answer}
      text={unescape(trivia.results[randomRiddleIndex].question)}
      onComplete={onComplete}
      showAnswer={showAnswer}
    />
  );
};

export default Trivia;
