import React, { FC } from 'react';
import { AnimatePresence, motion, Reorder } from 'framer-motion';
import useStore from './useStore';
import Unscramble from './modules/Unscramble';

const Game: FC = () => {
  const users = useStore(store => store.users);
  const userPoints = useStore(store => store.userPoints);
  const userColors = useStore(store => store.userColors);
  const setUsers = useStore(store => store.setUsers);
  const winner = useStore(store => store.winner);

  return (
    <div className="w-[100vw] h-[100vh]">
      {!winner && (
        <motion.div className="text-center w-full p-2">
          <Unscramble />
        </motion.div>
      )}
      {winner && (
        <div className="flex flex-col items-center justify-center">
          <div className="divider" />
          <motion.div className="text-center w-full">
            <h2>{winner} is the winner!</h2>
          </motion.div>
          <button
            type="button"
            className="btn"
            onClick={() => location.reload()}
          >
            Play Again
          </button>
        </div>
      )}
      <Reorder.Group
        axis="y"
        values={users}
        onReorder={setUsers}
        className="list-none pl-0"
      >
        <AnimatePresence>
          {users.map(item => (
            <Reorder.Item dragListener={false} key={item} value={item}>
              <div className="divider" />
              <div className="flex align-center justify-start items-center h-[100px] p-3">
                <motion.div
                  className="flex align-center justify-end h-full"
                  style={{
                    backgroundColor: userColors[item],
                  }}
                  animate={{
                    width: ((userPoints[item] || 0) / 1000) * window.innerWidth,
                  }}
                >
                  {(userPoints.item || 0) > 50 && (
                    <h2 className="m-0 pl-3 font-normal text-black">{item}</h2>
                  )}
                </motion.div>
                {(userPoints.item || 0) < 50 && (
                  <h2 className="m-0 pl-3 font-normal text-white">{item}</h2>
                )}
              </div>
            </Reorder.Item>
          ))}
        </AnimatePresence>
      </Reorder.Group>
    </div>
  );
};

export default Game;
