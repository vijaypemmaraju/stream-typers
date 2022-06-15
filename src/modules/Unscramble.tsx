import cx from 'classnames';
import React, { FC, useEffect, useState } from 'react';
import useIncomingChat from '../hooks/useIncomingChat';
import useStore from '../useStore';
import words from '../words.json';

const Unscramble: FC = () => {
  const [randomWordIndex] = useState(Math.floor(Math.random() * words.length));
  const [scrambledWord, setScrambledWord] = useState('');
  const [winner, setWinner] = useState('');
  const addPointsForUser = useStore(store => store.addPointsForUser);

  useIncomingChat((_channel, user, message) => {
    const word = message.toLowerCase().trim();
    if (
      word
        .split('')
        .every((char: string) =>
          (words[randomWordIndex] as string).split('').includes(char),
        ) &&
      words.includes(word)
    ) {
      const { users, setUsers } = useStore.getState();
      setWinner(user);
      addPointsForUser(user, 100);
      // eslint-disable-next-line no-shadow
      const { userPoints } = useStore.getState();
      const sortedUsers = Array.from(users).sort((a, b) => {
        const aPoints = userPoints[a] || 0;
        const bPoints = userPoints[b] || 0;
        return bPoints - aPoints;
      });
      setUsers(Array.from(new Set(sortedUsers)));
      if (userPoints[sortedUsers[0]] >= 1000) {
        setWinner(sortedUsers[0]);
      }
    }
  });

  useEffect(() => {
    const randomWord = words[randomWordIndex] as string;
    let word = '';
    while (word === '' || word === randomWord) {
      word = randomWord
        .split('')
        .sort(() => Math.random() - 0.5)
        .join('');
    }
    setScrambledWord(word);
  }, []);

  return (
    <div
      className={cx('stats shadow', winner ? 'bg-green-900' : 'bg-gray-900')}
    >
      <div className="stat">
        <div className="stat-title">Unscramble</div>
        <div className="stat-value">{scrambledWord}</div>
        <div className="stat-desc">{winner}</div>
      </div>
    </div>
  );
};

export default Unscramble;
