import React, { FC, useState } from 'react';
import riddles from './riddles.json';
import Module from './Module';

const Riddle: FC = () => {
  const [randomRiddleIndex] = useState(
    Math.floor(Math.random() * riddles.length),
  );

  console.log(riddles[randomRiddleIndex].answer);

  return (
    <Module
      prompt="Solve the Riddle"
      answer={riddles[randomRiddleIndex].answer}
      text={riddles[randomRiddleIndex].question}
    />
  );
};

export default Riddle;
