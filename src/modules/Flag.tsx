import React, { FC, useState } from 'react';
import flags from './flags.json';
import Module from './Module';

const Flag: FC = () => {
  const [randomFlagIndex] = useState(Math.floor(Math.random() * flags.length));

  console.log(flags[randomFlagIndex].name);

  return (
    <Module
      prompt="Identify the flag"
      answer={flags[randomFlagIndex].name}
      text={flags[randomFlagIndex].emoji}
    />
  );
};

export default Flag;
