import React, { FC, useEffect, useState } from 'react';
import words from '../words.json';
import Module from './Module';

const Unscramble: FC = () => {
  const [randomWordIndex] = useState(Math.floor(Math.random() * words.length));
  const [scrambledWord, setScrambledWord] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    const randomWord = words[randomWordIndex] as string;
    let word = '';
    while (word === '' || word === randomWord) {
      word = randomWord
        .split('')
        .sort(() => Math.random() - 0.5)
        .join('');
    }
    setAnswer(randomWord);
    setScrambledWord(word);
  }, []);

  return (
    <Module
      prompt="Unscramble the Word"
      answer={answer}
      text={scrambledWord}
      predicate={message =>
        message
          .split('')
          .every((char: string) =>
            (words[randomWordIndex] as string).split('').includes(char),
          ) && words.includes(message)
      }
      onComplete={message => setAnswer(message)}
    />
  );
};

export default Unscramble;
