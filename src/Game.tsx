import cx from 'classnames';
import React, { FC, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useStore from './useStore';
import Unscramble from './modules/Unscramble';
import Flag from './modules/Flag';
import MathExpression from './modules/MathExpression';
import Riddle from './modules/Riddle';
import Trivia from './modules/Trivia';
import Progress from './Progress';
import { ModuleProps } from './modules/props';
import Users from './Users';

const moduleComponents = [Unscramble, Flag, MathExpression, Riddle, Trivia];

const Game: FC = () => {
  const winner = useStore(store => store.winner);
  const [modules, setModules] = useState<FC<ModuleProps>[]>([]);
  const [showAnswers, setShowAnswers] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);
  const [gameState, setGameState] = useState<
    'beginning_round' | 'round_in_progress' | 'round_complete' | 'game_complete'
  >('beginning_round');
  const modalToggleRef = React.useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // create 5 modules
    const chosenModules: FC[] = [];
    for (let i = 0; i < 10; i += 1) {
      chosenModules.push(
        moduleComponents[Math.floor(Math.random() * moduleComponents.length)],
      );
    }
    setModules(chosenModules);
  }, []);

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      {!winner && (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <h1>Round {currentRound}</h1>
          {gameState === 'beginning_round' && (
            <>
              <h2>Get Ready!</h2>
              <Progress
                tick={5}
                onComplete={() => {
                  setGameState('round_in_progress');
                }}
              />
            </>
          )}
          {gameState === 'round_in_progress' && (
            <Progress
              onComplete={() => {
                setShowAnswers(true);
                setTimeout(() => {
                  modalToggleRef.current!.checked = true;
                }, 1000);
              }}
            />
          )}
          <div
            className={cx(
              'pt-4 flex flex-wrap gap-8 w-[70%] h-[50%] justify-center items-center',
              gameState === 'beginning_round' && 'invisible',
            )}
          >
            {modules.map((Module, index) => (
              <Module key={index} showAnswer={showAnswers} />
            ))}
          </div>
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
      <input
        type="checkbox"
        id="my-modal"
        className="modal-toggle"
        ref={modalToggleRef}
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Round {currentRound} completed</h3>
          <Users />
          <div className="modal-action">
            <label htmlFor="my-modal" className="btn">
              Continue
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
