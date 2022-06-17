import React, { FC, useState } from 'react';
import flags from './flags.json';
import Module from './Module';
import { ModuleProps } from './props';

const Flag: FC<ModuleProps> = ({ onComplete, showAnswer }) => {
  const [randomFlagIndex] = useState(Math.floor(Math.random() * flags.length));

  return (
    <Module
      prompt="Identify the Flag"
      answer={flags[randomFlagIndex].name}
      text={flags[randomFlagIndex].emoji}
      textClassName="text-[72px] mt-2"
      onComplete={onComplete}
      showAnswer={showAnswer}
    />
  );
};

export default Flag;
