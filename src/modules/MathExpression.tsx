import mexp from 'math-expression-evaluator';
import React, { FC, useState } from 'react';
import Module from './Module';

const operators = ['+', '-', '*'];

const MathExpression: FC = () => {
  const [randomNumbers] = useState(
    Array.from(
      { length: Math.floor(Math.random() * 3) + 2 },
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

  console.log(mexp.eval(expression));
  return (
    <Module
      prompt="Solve the expression"
      answer={mexp.eval(expression).toString()}
      text={expression}
    />
  );
};

export default MathExpression;
