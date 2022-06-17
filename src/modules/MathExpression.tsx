import mexp from 'math-expression-evaluator';
import React, { FC, useState } from 'react';
import Module from './Module';
import { ModuleProps } from './props';

const operators = ['+', '-', '*'];

const MathExpression: FC<ModuleProps> = ({ onComplete, showAnswer }) => {
  const [randomNumbers] = useState(
    Array.from(
      { length: Math.floor(Math.random() * 2) + 3 },
      () => Math.floor(Math.random() * 20) + 1,
    ),
  );

  const [randomOperators] = useState(
    Array.from(
      { length: randomNumbers.length - 1 },
      () => operators[Math.floor(Math.random() * operators.length)],
    ),
  );

  // combine numbers and operators
  const expression = randomNumbers.reduce(
    (acc, number, index) =>
      acc +
      number +
      (index === randomNumbers.length - 1 ? '' : randomOperators[index]),
    '',
  );

  return (
    <Module
      prompt="Solve the Expression"
      answer={mexp.eval(expression).toString()}
      text={expression}
      textClassName="text-3xl"
      onComplete={onComplete}
      showAnswer={showAnswer}
    />
  );
};

export default MathExpression;
