import cx from 'classnames';
import React, { FC, useEffect, useState } from 'react';
import emojiFlags from 'emoji-flags';
import useIncomingChat from '../hooks/useIncomingChat';
import useStore from '../useStore';
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
