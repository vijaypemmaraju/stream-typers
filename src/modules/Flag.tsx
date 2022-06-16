import React, { FC, useState } from 'react';
import emojiFlags from 'emoji-flags';
import Module from './Module';

const Flag: FC = () => {
  const [randomFlagIndex] = useState(
    Math.floor(Math.random() * emojiFlags.data.length),
  );

  console.log(emojiFlags.data[randomFlagIndex].name);

  return (
    <Module
      prompt="Identify the flag"
      answer={emojiFlags.data[randomFlagIndex].name}
      text={emojiFlags.data[randomFlagIndex].emoji}
    />
  );
};

export default Flag;
