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
  const categoryFrequencySettings = usePersistedStore(
    store => store.categoryFrequencySettings,
  );
  const updateCategoryFrequencySetting = usePersistedStore(
    store => store.updateCategoryFrequencySetting,
  );
  return (
    <>
      {categories.map(category => (
        <div key={category}>
          <h3>{category}</h3>
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
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
          </div>
        </div>
      ))}
    </>
  );
};

export default Settings;
