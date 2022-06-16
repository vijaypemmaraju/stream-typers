import cx from 'classnames';
import { motion } from 'framer-motion';
import React, { FC, useState } from 'react';
import useIncomingChat from '../hooks/useIncomingChat';
import useStore from '../useStore';

type ModuleProps = {
  prompt: string;
  text: string;
  answer: string;
  predicate?: (message: string) => boolean;
  onComplete?: (message: string) => void;
};

const Module: FC<ModuleProps> = ({
  prompt,
  text,
  answer,
  onComplete,
  predicate = message => message === answer.toLowerCase(),
}) => {
  const [winner, setWinner] = useState('');
  const addPointsForUser = useStore(store => store.addPointsForUser);

  useIncomingChat((_channel, user, message) => {
    const normalizedMessage = message.toLowerCase().trim();
    if (predicate(normalizedMessage)) {
      const { users, setUsers } = useStore.getState();
      setWinner(user);
      onComplete?.(normalizedMessage);
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

  return (
    <motion.div
      className={cx(
        'stats shadow text-center min-w-[300px] box-border transition-all duration-500',
        winner ? 'bg-green-900' : 'bg-gray-900',
      )}
    >
      <div className="stat min-w-[300px]">
        <div className="stat-title font-semibold">
          {winner && answer}
          {!winner && prompt}
        </div>
        <div className="stat-value">{text}</div>
        <div className="stat-desc font-semibold text-lg p-2">{winner}</div>
      </div>
    </motion.div>
  );
};

export default Module;
