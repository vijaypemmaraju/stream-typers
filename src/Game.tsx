import React, { FC } from 'react';
import { Button, Divider, List, Typography } from '@mui/material';
import { AnimatePresence, motion, Reorder } from 'framer-motion';
import useStore from './useStore';

type GameProps = {
  scrambledWord: string;
};

const Game: FC<GameProps> = ({ scrambledWord }) => {
  const users = useStore(store => store.users);
  const userPoints = useStore(store => store.userPoints);
  const setUsers = useStore(store => store.setUsers);
  const winner = useStore(store => store.winner);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
      }}
    >
      {!winner && (
        <motion.div
          style={{
            textAlign: 'center',
            width: '100%',
            padding: 10,
          }}
        >
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
          <motion.div
            style={{
              textAlign: 'center',
              width: '100%',
            }}
          >
            <Typography variant="h2">{winner} is the winner!</Typography>
          </motion.div>
          <Button variant="contained" onClick={() => location.reload()}>
            Play Again
          </Button>
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
                      backgroundColor: item,
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                    }}
                    animate={{
                      width:
                        ((userPoints.item || 0) / 1000) * window.innerWidth,
                    }}
                  >
                    {(userPoints.item || 0) > 50 && (
                      <Typography
                        variant="h4"
                        style={{
                          padding: 10,
                          color: 'black',
                        }}
                      >
                        {item}
                      </Typography>
                    )}
                  </motion.div>
                  {(userPoints.item || 0) < 50 && (
                    <Typography
                      variant="h4"
                      style={{
                        paddingLeft: 10,
                        color: 'white',
                      }}
                    >
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
  );
};

export default Game;
