import React, { FC, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useStore from './useStore';
import Unscramble from './modules/Unscramble';
import Flag from './modules/Flag';

const moduleComponents = [Unscramble, Flag];

const Game: FC = () => {
  const winner = useStore(store => store.winner);
  const [modules, setModules] = useState<FC[]>([]);

  useEffect(() => {
    // create 5 modules
    const chosenModules: FC[] = [];
    for (let i = 0; i < 20; i += 1) {
      chosenModules.push(
        moduleComponents[Math.floor(Math.random() * moduleComponents.length)],
      );
    }
    setModules(chosenModules);
  }, []);

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      {!winner && (
        <div className="flex flex-wrap gap-4 w-[75%] h-[75%] justify-center items-center">
          {modules.map((Module, index) => (
            <Module key={index} />
          ))}
        </div>
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
      {/* <Users /> */}
    </div>
  );
};

export default Game;
