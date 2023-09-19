import cx from 'classnames';
import { motion, useAnimation } from 'framer-motion';
import React, { FC, useEffect, useState } from 'react';
import useIncomingChat from '../hooks/useIncomingChat';
import playAudio from '../playAudio';
import usePersistedStore from '../usePersistedStore';
import useStore from '../useStore';
import { StaticAuthProvider } from '@twurple/auth';
import { ApiClient } from '@twurple/api';

type ModuleProps = {
  prompt: string;
  text: React.ReactNode;
  answer: string;
  predicate?: (message: string) => boolean;
  onComplete?: (message: string) => void;
  textClassName?: string;
  showAnswer?: boolean;
};

const Module: FC<ModuleProps> = ({
  prompt,
  text,
  answer,
  onComplete,
  predicate = message => message === answer.toLowerCase(),
  textClassName,
  showAnswer,
}) => {
  const [winner, setWinner] = useState('');
  const addPointsForUser = useStore(store => store.addPointsForUser);
  const userIcons = useStore(store => store.userIcons);
  const setUsers = useStore(store => store.setUsers);
  const streamer = usePersistedStore(store => store.streamer);
  const controls = useAnimation();
  const accessToken = usePersistedStore(store => store.accessToken);
  const setIconForUser = useStore(store => store.setIconForUser);
  const winnerRef = React.useRef(winner);

  useEffect(() => {
    winnerRef.current = winner;
  });

  useIncomingChat(async (_channel, user, message, msg) => {
    if (winnerRef.current) {
      return;
    }
    const { gameState, users } = useStore.getState();
    if (gameState !== 'round_in_progress') {
      return;
    }
    const normalizedMessage = message.toLowerCase().trim();
    const userName = msg.userInfo.displayName.toLowerCase();

    if (!users.includes(userName)) {
      users.push(userName);
      const authProvider = new StaticAuthProvider(
        'rybwfkon925lffxuhr5tlkyqs259q5',
        accessToken,
      );
      const apiClient = new ApiClient({ authProvider });

      const user = await apiClient.users.getUserById(msg.userInfo.userId);
      setIconForUser(userName, user!.profilePictureUrl);
      setUsers(users);
    }

    if (predicate(normalizedMessage)) {
      if (userName === streamer) {
        // wait 3 seconds before rewarding the streamer
        await new Promise(resolve => {
          setTimeout(resolve, 3000);
        });

        if (winnerRef.current) {
          return;
        }

        if (useStore.getState().gameState !== 'round_in_progress') {
          return;
        }
      }
      const { setUsers, winners, addWinner } = useStore.getState();
      setWinner(user);
      playAudio('./score.flac', 0.8);
      controls.start({
        scale: [1, 5, 1],
        rotateZ: [0, -400, 400, -400, 400, 0],
        transition: { duration: 0.5 },
      });
      onComplete?.(normalizedMessage);
      if (winners.length === 0) {
        addPointsForUser(user, 100);
      }
      // eslint-disable-next-line no-shadow
      const { userPoints } = useStore.getState();
      const sortedUsers = Array.from(users).sort((a, b) => {
        const aPoints = userPoints[a] || 0;
        const bPoints = userPoints[b] || 0;
        return bPoints - aPoints;
      });
      setUsers(Array.from(new Set(sortedUsers)));
      if (userPoints[sortedUsers[0]] >= 1000 && winners.length === 0) {
        addWinner(sortedUsers[0]);
      }
    }
  });

  return (
    <motion.div
      className={cx(
        'stats shadow text-center min-w-[300px] w-width-[300px] min-h-[200px] box-border transition-all duration-500',
        winner ? 'bg-green-800' : 'bg-gray-900',
      )}
      animate={controls}
    >
      <div className="stat min-w-[300px] max-w-[300px]">
        <div className="font-semibold stat-title">
          {(winner || showAnswer) && answer}
          {!(winner || showAnswer) && prompt}
        </div>
        <div
          className={cx(
            'stat-value whitespace-normal',
            textClassName,
            !textClassName && 'text-xl',
          )}
        >
          {text}
        </div>
        <div className="flex items-center justify-center p-2 text-lg font-semibold stat-desc">
          {winner && (
            <img
              src={userIcons[winner]}
              alt={winner}
              className="w-8 h-8 mt-0 mb-0 mr-2"
            />
          )}
          {winner}
        </div>
      </div>
    </motion.div>
  );
};

export default Module;
