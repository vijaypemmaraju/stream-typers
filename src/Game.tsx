import cx from 'classnames';
import shortid from 'shortid';
import React, { FC, useEffect, useRef, useState } from 'react';
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
import confetti from './confetti';
import useIncomingChat from './hooks/useIncomingChat';
import playAudio from './playAudio';

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

function fire(particleRatio, opts) {
  confetti({
    ...opts,
    particleCount: Math.floor(1000 * particleRatio),
  });
}

const Game: FC = () => {
  const winner = useStore(store => store.winner);
  const [modules, setModules] = useState<ModuleItem[]>([]);
  const [showAnswers, setShowAnswers] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);
  const [roundCompleted, setRoundCompleted] = useState(false);
  const gameState = useStore(store => store.gameState);
  const setGameState = useStore(store => store.setGameState);
  const [usersModalOpen, setUsersModalOpen] = useState(false);
  const modalToggleRef = React.useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (modalToggleRef.current) {
      modalToggleRef.current.checked = usersModalOpen;
    }
  }, [usersModalOpen]);
  const categoryFrequencySettings = usePersistedStore(
    store => store.categoryFrequencySettings,
  );
  const questionsPerRound = usePersistedStore(store => store.questionsPerRound);

  const moduleComponents: FC<ModuleProps>[] = [];

  Object.entries(categoryFrequencySettings).forEach(([category, frequency]) => {
    for (let i = 0; i < frequency; i += 1) {
      moduleComponents.push(categories[category]);
    }
  });

  useEffect(() => {
    const chosenModules: ModuleItem[] = [];
    for (let i = 0; i < questionsPerRound; i += 1) {
      chosenModules.push({
        id: shortid.generate(),
        module:
          moduleComponents[Math.floor(Math.random() * moduleComponents.length)],
      } as ModuleItem);
    }
    setModules(chosenModules);
    playAudio('./game-start.mp3');
  }, [currentRound]);

  useEffect(() => {
    if (gameState === 'round_in_progress') {
      let plays = 0;
      const interval = setInterval(() => {
        if (plays >= questionsPerRound) {
          clearInterval(interval);
          return;
        }
        playAudio('./woosh.flac', 0.3, Math.random() * 0.2 + 0.9);
        plays += 1;
      }, 100);
    }
  }, [gameState, currentRound]);

  const roundLength = usePersistedStore(store => store.roundLength);

  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    if (gameComplete) {
      playAudio('./win.flac');
      confetti();
    }
  }, [gameComplete]);

  const [flipped, setFlipped] = useState(false);

  const flippedRef = useRef(flipped);

  useEffect(() => {
    flippedRef.current = flipped;
  });

  useIncomingChat((_channel, user, message, msg) => {
    if (message.toLowerCase().trim().includes('!flip') && msg.isCheer) {
      setFlipped(!flippedRef.current);
    }
    if (message.toLowerCase().trim().includes('!confetti') && msg.isCheer) {
      fire(0.25, {
        spread: 26,
        startVelocity: 55,
      });
      fire(0.2, {
        spread: 60,
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });
    }
  });

  useEffect(() => {
    let timeout;
    if (flipped) {
      timeout = setTimeout(() => {
        setFlipped(false);
      }, 10000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [flipped]);

  return (
    <motion.div
      className="w-[100vw] flex justify-center items-center"
      initial={{ rotate: 0, opacity: 0 }}
      animate={{ rotate: flipped ? 180 : 0, opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {!gameComplete && (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <motion.h1 layout>Round {currentRound}</motion.h1>
          {gameState === 'beginning_round' && (
            <>
              <h2>Get Ready!</h2>
              <Progress
                amount={2}
                onComplete={() => {
                  setGameState('round_in_progress');
                }}
              />
            </>
          )}
          {gameState === 'round_in_progress' && (
            <motion.div
              className="flex flex-col items-center justify-center w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Progress
                amount={roundLength}
                onComplete={() => {
                  setShowAnswers(true);
                  setGameState('round_complete');
                }}
              />
            </motion.div>
          )}
          {gameState === 'round_complete' && (
            <>
              <h2>Round Complete!</h2>
              {roundCompleted && !winner && (
                <div className="flex">
                  <button
                    type="button"
                    className="btn"
                    onClick={() => {
                      setUsersModalOpen(true);
                    }}
                  >
                    See Scores
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      setCurrentRound(currentRound + 1);
                      setGameState('beginning_round');
                      setShowAnswers(false);
                      setRoundCompleted(false);
                      setUsersModalOpen(false);
                    }}
                  >
                    Continue
                  </button>
                </div>
              )}
              {!winner && (
                <Progress
                  amount={5}
                  onComplete={() => {
                    setRoundCompleted(true);
                    if (!winner) {
                      setUsersModalOpen(true);
                    }
                  }}
                />
              )}
              {winner && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setGameComplete(true);
                  }}
                >
                  Continue
                </button>
              )}
            </>
          )}
          {gameState !== 'beginning_round' && (
            <div
              className={cx(
                'mt-8 flex flex-wrap gap-8 justify-center items-center',
              )}
              style={{
                width: modules.length > 12 ? '90vw' : 'min(90vw, 1440px)',
              }}
            >
              {modules.map((moduleItem, index) => (
                <motion.div
                  key={moduleItem.id}
                  initial={{ opacity: 0, y: 200 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index / 10 }}
                >
                  <moduleItem.module showAnswer={showAnswers} />
                </motion.div>
              ))}
            </div>
          )}
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
          {usersModalOpen && <Users />}
          <div className="modal-action">
            <label htmlFor="my-modal">
              <button
                type="button"
                className="btn"
                onClick={() => {
                  setUsersModalOpen(false);
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
                  setUsersModalOpen(false);
                }}
              >
                Continue
              </button>
            </label>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Game;
