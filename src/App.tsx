import React, { FC, useEffect, useState } from 'react';
import { ChatClient } from '@twurple/chat';
import words from './words.json';
import useStore from './useStore';
import usePersistedStore from './usePersistedStore';
import Game from './Game';
import Lobby from './Lobby';

const App: FC = () => {
  const addColorForUser = useStore(store => store.addColorForUser);
  const addPointsForUser = useStore(store => store.addPointsForUser);
  const mode = useStore(store => store.mode);
  const randomWordIndex = useStore(store => store.randomWordIndex);
  const setUsers = useStore(store => store.setUsers);
  const setRandomWordIndex = useStore(store => store.setRandomWordIndex);
  const setWinner = useStore(store => store.setWinner);

  const streamer = usePersistedStore(store => store.streamer);

  const [scrambledWord, setScrambledWord] = useState('');

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
  }, [randomWordIndex]);

  useEffect(() => {
    const loader = async () => {
      const chatClient = new ChatClient({
        channels: [streamer],
      });
      chatClient.connect().then(() => {
        chatClient.onMessage(
          async (_channel: string, _user: string, message: string, msg) => {
            // eslint-disable-next-line no-shadow
            const { mode, users, randomWordIndex } = useStore.getState();
            const userName = msg.userInfo.displayName.toLowerCase();
            if (mode === 'lobby') {
              if (message === '!join') {
                // if (userName === streamer) {
                //   return;
                // }
                if (users.length >= 20) {
                  return;
                }
                users.push(userName);
                addColorForUser(userName);
              }
              setUsers(Array.from(new Set(users)));
            } else if (mode === 'game') {
              if (useStore.getState().winner || !users.includes(userName)) {
                return;
              }
              const word = message.toLowerCase().trim();
              if (
                word
                  .split('')
                  .every(char =>
                    (words[randomWordIndex] as string).split('').includes(char),
                  ) &&
                words.includes(word)
              ) {
                addPointsForUser(userName, 100);
                setRandomWordIndex(Math.floor(Math.random() * words.length));
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
            }
          },
        );
      });
    };
    loader();
  }, [streamer]);

  return (
    <div className="flex flex-col justify-center items-center">
      {mode === 'lobby' && <Lobby />}
      {mode === 'game' && <Game scrambledWord={scrambledWord} />}
    </div>
  );
};

export default App;
