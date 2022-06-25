import React, { FC } from 'react';
import usePersistedStore from './usePersistedStore';

export const categories = [
  'Unscramble',
  'Flags',
  'Math',
  'Riddle',
  'Trivia',
  'Capitals',
  'Countries',
  'Pokémon',
];

const Settings: FC = () => {
  const roundLength = usePersistedStore(store => store.roundLength);
  const setRoundLength = usePersistedStore(store => store.setRoundLength);
  const categoryFrequencySettings = usePersistedStore(
    store => store.categoryFrequencySettings,
  );
  const updateCategoryFrequencySetting = usePersistedStore(
    store => store.updateCategoryFrequencySetting,
  );

  const questionsPerRound = usePersistedStore(store => store.questionsPerRound);
  const setQuestionsPerRound = usePersistedStore(
    store => store.setQuestionsPerRound,
  );

  const masterVolume = usePersistedStore(store => store.masterVolume);
  const setMasterVolume = usePersistedStore(store => store.setMasterVolume);

  const maxPlayers = usePersistedStore(store => store.maxPlayers);
  const setMaxPlayers = usePersistedStore(store => store.setMaxPlayers);
  return (
    <>
      <h3>Game</h3>
      <div className="w-full form-control">
        <label className="label">
          <span className="label-text">Round Length</span>
          <span className="label-text-alt">in seconds</span>
        </label>
        <input
          type="number"
          min="0"
          value={roundLength}
          className="input input-bordered"
          step="1"
          onChange={e => setRoundLength(+e.target.value)}
        />
        <label className="label">
          <span className="label-text">Max Players</span>
        </label>
        <input
          type="number"
          min="1"
          value={maxPlayers}
          className="input input-bordered"
          step="1"
          onChange={e => setMaxPlayers(+e.target.value)}
        />
      </div>
      <div className="w-full pt-4 form-control">
        <label className="label">
          <span className="label-text">Questions Per Round</span>
        </label>
        <input
          type="range"
          min="8"
          max="15"
          value={questionsPerRound}
          className="range"
          onChange={e => setQuestionsPerRound(+e.target.value)}
          step="1"
        />
      </div>
      <div className="flex justify-between w-full px-2 text-xs text-center">
        {new Array(15 - 8 + 1).fill(0).map((_, i) => (
          <span>
            <div>|</div>
            <div>{i + 8}</div>
          </span>
        ))}
      </div>
      <div className="divider" />
      <h3>Audio</h3>
      <div className="w-full pt-4 form-control">
        <label className="label">
          <span className="label-text">Volume</span>
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={masterVolume}
          className="range"
          onChange={e => setMasterVolume(+e.target.value)}
          step="1"
        />
      </div>
      <div className="divider" />
      <h3>Categories</h3>
      <div className="pb-4">
        {categories.map(category => (
          <div key={category} className="py-1">
            <div className="w-full form-control">
              <label className="label">
                <span className="label-text">{category}</span>
              </label>
              <input
                type="range"
                min="0"
                max="4"
                value={categoryFrequencySettings[category] || 0}
                className="range"
                onChange={e =>
                  updateCategoryFrequencySetting(category, +e.target.value)
                }
                step="1"
              />
              <div className="flex justify-between w-full px-2 text-xs">
                <span>
                  <div>|</div>
                  <div className="relative left-[-10px]">None</div>
                </span>
                <span>|</span>
                <span>
                  <div>|</div>
                  <div className="relative left-[-10px]">Some</div>
                </span>
                <span>|</span>
                <span>
                  <div>|</div>
                  <div className="relative left-[-10px]">More</div>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Settings;
