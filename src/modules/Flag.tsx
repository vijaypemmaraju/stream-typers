import React, { FC, useState } from 'react';
import flags from './flags.json';
import Module from './Module';

const Flag: FC = () => {
  const [randomFlagIndex] = useState(Math.floor(Math.random() * flags.length));

  console.log(flags[randomFlagIndex].name);

  return (
    <Module
      prompt="Identify the Flag"
      answer={flags[randomFlagIndex].name}
      text={flags[randomFlagIndex].emoji}
      textClassName="text-[72px] mt-2"
    />
  );
};

export default Flag;
