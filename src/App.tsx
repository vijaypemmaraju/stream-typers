import React, { FC, useEffect, useState } from 'react';
import { ChatClient } from '@twurple/chat';
import { Button, Divider, List, Typography } from '@mui/material';
import { AnimatePresence, motion, Reorder } from 'framer-motion';
import words from './words.json';
import useStore from './useStore';

const App: FC = () => {
  const users = useStore(store => store.users);
  const userColors = useStore(store => store.userColors);
  const userPoints = useStore(store => store.userPoints);
  const addColorForUser = useStore(store => store.addColorForUser);
  const addPointsForUser = useStore(store => store.addPointsForUser);
  const mode = useStore(store => store.mode);
  const randomWordIndex = useStore(store => store.randomWordIndex);
  const setUsers = useStore(store => store.setUsers);
  const setMode = useStore(store => store.setMode);
  const setRandomWordIndex = useStore(store => store.setRandomWordIndex);
  const winner = useStore(store => store.winner);
  const setWinner = useStore(store => store.setWinner);

  console.log(users);

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

  console.log(scrambledWord);

  useEffect(() => {
    const loader = async () => {
      const streamer = 'elevatelol';
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
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        maxWidth: '100vw',
      }}
    >
      {mode === 'lobby' && (
        <>
          <div
            style={{
              width: 'fit-content',
            }}
          >
            <Typography
              variant="h1"
              sx={{
                margin: 4,
                overflow: 'hidden',
                borderRight: '.1em solid orange',
                whiteSpace: 'nowrap',
                letterSpacing: '.175em',
                animation: `typing 2.5s steps(14, end), blink-caret .75s step-end infinite`,
              }}
            >
              Stream Typers
            </Typography>
          </div>
          <Typography variant="h6">Type !join in chat to join</Typography>
          <Divider />
          <Typography>Connected Players: {users.length} / 20</Typography>
          <Reorder.Group axis="y" values={users} onReorder={setUsers}>
            <List>
              <AnimatePresence>
                {users.map(item => (
                  <Reorder.Item dragListener={false} key={item} value={item}>
                    <Divider />
                    <div
                      style={{
                        padding: 10,
                        height: 50,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                      }}
                    >
                      <motion.div
                        style={{
                          width: '50vw',
                          backgroundColor: userColors[item],
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <div style={{ padding: 10 }}>{item}</div>
                      </motion.div>
                    </div>
                    <Divider />
                  </Reorder.Item>
                ))}
              </AnimatePresence>
            </List>
          </Reorder.Group>
          <Button
            variant="contained"
            disabled={users.length === 0}
            onClick={() => {
              setMode('game');
            }}
          >
            Start
          </Button>
        </>
      )}
      {mode === 'game' && (
        <div style={{ width: '100vw', height: '100vh' }}>
          {!winner && (
            <motion.div style={{ textAlign: 'center', width: '100%' }}>
              <Typography variant="h2">
                Unscramble the word and type in chat: {scrambledWord}
              </Typography>
            </motion.div>
          )}
          {winner && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Divider />
              <motion.div style={{ textAlign: 'center', width: '100%' }}>
                <Typography variant="h2">{winner} is the winner!</Typography>
              </motion.div>
              <Button onClick={() => location.reload()}>Play Again</Button>
            </div>
          )}
          <Divider />
          <Reorder.Group axis="y" values={users} onReorder={setUsers}>
            <List>
              <AnimatePresence>
                {users.map(item => (
                  <Reorder.Item dragListener={false} key={item} value={item}>
                    <Divider />
                    <div
                      style={{
                        padding: 10,
                        height: 100,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                      }}
                    >
                      <motion.div
                        style={{
                          backgroundColor: userColors[item],
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                        }}
                        animate={{
                          width:
                            ((userPoints[item] || 0) / 1000) *
                            window.innerWidth,
                        }}
                      >
                        {(userPoints[item] || 0) > 50 && (
                          <Typography style={{ padding: 10 }}>
                            {item}
                          </Typography>
                        )}
                      </motion.div>
                      {(userPoints[item] || 0) < 50 && (
                        <Typography style={{ paddingLeft: 10 }}>
                          {item}
                        </Typography>
                      )}
                    </div>
                    <Divider />
                  </Reorder.Item>
                ))}
              </AnimatePresence>
            </List>
          </Reorder.Group>
        </div>
      )}
    </div>
  );
};

export default App;
