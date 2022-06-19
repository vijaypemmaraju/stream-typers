import cx from 'classnames';
import shortid from 'shortid';
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
import WorldCapital from './modules/WorldCapital';
import WorldCountry from './modules/WorldCountry';
import usePersistedStore from './usePersistedStore';

const categories = {
  Unscramble,
  Flags: Flag,
  Math: MathExpression,
  Riddle,
  Trivia,
  Capitals: WorldCapital,
  Countries: WorldCountry,
};

type ModuleItem = {
  id: string;
  module: FC<ModuleProps>;
};

const Game: FC = () => {
  const winner = useStore(store => store.winner);
  const [modules, setModules] = useState<ModuleItem[]>([]);
  const [showAnswers, setShowAnswers] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);
  const [roundCompleted, setRoundCompleted] = useState(false);
  const gameState = useStore(store => store.gameState);
  const setGameState = useStore(store => store.setGameState);
  const modalToggleRef = React.useRef<HTMLInputElement | null>(null);
  const categoryFrequencySettings = usePersistedStore(
    store => store.categoryFrequencySettings,
  );

  const moduleComponents: FC<ModuleProps>[] = [];

  Object.entries(categoryFrequencySettings).forEach(([category, frequency]) => {
    for (let i = 0; i < frequency; i += 1) {
      moduleComponents.push(categories[category]);
    }
  });

  useEffect(() => {
    const chosenModules: ModuleItem[] = [];
    for (let i = 0; i < 12; i += 1) {
      chosenModules.push({
        id: shortid.generate(),
        module:
          moduleComponents[Math.floor(Math.random() * moduleComponents.length)],
      } as ModuleItem);
    }
    setModules(chosenModules);
  }, [currentRound]);

  const gameComplete =
    !!winner && gameState === 'round_complete' && roundCompleted;

  return (
    <div className="w-[100vw] flex justify-center items-center">
      {!gameComplete && (
        <div className="flex flex-col items-center justify-center w-full h-full">
          {gameState === 'beginning_round' && (
            <>
              <h2>Get Ready!</h2>
              <h1>Round {currentRound}</h1>
              <Progress
                tick={5}
                onComplete={() => {
                  setGameState('round_in_progress');
                }}
              />
            </>
          )}
          {gameState === 'round_in_progress' && (
            <>
              <h1>Round {currentRound}</h1>
              <Progress
                onComplete={() => {
                  setShowAnswers(true);
                  setGameState('round_complete');
                }}
              />
            </>
          )}
          {gameState === 'round_complete' && (
            <>
              <h2>Round Complete!</h2>
              <h1>Round {currentRound}</h1>
              {roundCompleted && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setCurrentRound(currentRound + 1);
                    setGameState('beginning_round');
                    setShowAnswers(false);
                    setRoundCompleted(false);
                    modalToggleRef.current!.checked = false;
                  }}
                >
                  Continue
                </button>
              )}
              <Progress
                tick={1.5}
                onComplete={() => {
                  setRoundCompleted(true);
                  if (!winner) {
                    modalToggleRef.current!.checked = true;
                  }
                }}
              />
            </>
          )}
          <div
            className={cx(
              'mt-8 flex flex-wrap gap-8 justify-center items-center',
              gameState === 'beginning_round' && 'invisible',
            )}
            style={{
              width: 'min(90vw, 1366px)',
            }}
          >
            {modules.map(moduleItem => (
              <moduleItem.module key={moduleItem.id} showAnswer={showAnswers} />
            ))}
          </div>
        </div>
      )}
      {gameComplete && (
        <div className="flex flex-col items-center justify-center">
          <div className="divider" />
          <motion.div className="w-full text-center">
            <h2>{winner} is the winner!</h2>
          </motion.div>
          <button
            type="button"
            className="btn"
            onClick={() => location.reload()}
          >
            Play Again
          </button>
          <Users />
        </div>
      )}
      <input
        type="checkbox"
        id="my-modal"
        className="modal-toggle"
        ref={modalToggleRef}
      />
      <div className="modal">
        <div className="modal-box max-w-[50vw]">
          <h3 className="text-lg font-bold">Round {currentRound} completed</h3>
          <Users />
          <div className="modal-action">
            <label htmlFor="my-modal">
              <button
                type="button"
                className="btn"
                onClick={() => {
                  modalToggleRef.current!.checked = false;
                }}
              >
                See Answers
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setCurrentRound(currentRound + 1);
                  setGameState('beginning_round');
                  setShowAnswers(false);
                  setRoundCompleted(true);
                  modalToggleRef.current!.checked = false;
                }}
              >
                Continue
              </button>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
