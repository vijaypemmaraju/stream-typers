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
  return (
    <>
      <h3>Timers</h3>
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
      </div>
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
                value={categoryFrequencySettings[category]}
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
