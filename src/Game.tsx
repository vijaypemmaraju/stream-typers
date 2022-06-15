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
    <div className="w-[100vw] h-[100vh]">
      {!winner && (
        <motion.div className="text-center w-full p-2">
          <Typography variant="h2">
            Unscramble the word and type in chat: {scrambledWord}
          </Typography>
        </motion.div>
      )}
      {winner && (
        <div className="flex flex-col items-center justify-center">
          <Divider />
          <motion.div className="text-center w-full">
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
                <div className="flex align-center justify-start items-center h-[100px] p-3">
                  <motion.div
                    className="flex align-center justify-end"
                    style={{
                      backgroundColor: item,
                    }}
                    animate={{
                      width:
                        ((userPoints.item || 0) / 1000) * window.innerWidth,
                    }}
                  >
                    {(userPoints.item || 0) > 50 && (
                      <Typography
                        variant="h4"
                        className="p-3"
                        style={{ color: 'black' }}
                      >
                        {item}
                      </Typography>
                    )}
                  </motion.div>
                  {(userPoints.item || 0) < 50 && (
                    <Typography variant="h4" className="p-3 text-white">
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
