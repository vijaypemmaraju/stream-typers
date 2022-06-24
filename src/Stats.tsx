import React, { FC, useState } from 'react';
import usePersistedStore from './usePersistedStore';

const Stats: FC = () => {
  const winners = usePersistedStore(store => store.winners);
  const resetWinners = usePersistedStore(store => store.resetWinners);
  const [resetConfirmation, setResetConfirmation] = useState(false);

  const sortedWinners = Object.keys(winners).sort((a, b) => {
    const aCount = winners[a];
    const bCount = winners[b];
    return bCount - aCount;
  });

  if (sortedWinners.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-start bg-gray-900 shadow-xl card w-96">
      <h1 className="pt-5">Stats</h1>
      <div className="w-full max-h-[50vh] overflow-y-auto">
        <table className="table w-full mt-0">
          <thead>
            <tr>
              <th className="text-left bg-gray-900">Username</th>
              <th className="text-left bg-gray-900">Wins</th>
            </tr>
          </thead>
          <tbody>
            {sortedWinners.map(winner => (
              <tr key={winner}>
                <td className="text-xl font-bold bg-gray-900">{winner}</td>
                <td className="text-xl font-bold bg-gray-900">
                  {winners[winner]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!resetConfirmation && (
        <button
          type="button"
          className="btn"
          onClick={() => setResetConfirmation(true)}
        >
          Reset
        </button>
      )}
      {resetConfirmation && (
        <div className="p-5 bg-gray-900 shadow-xl">
          <p className="font-bold">
            Are you sure? This will remove all stats. This is irreversible!
          </p>
          <div className="flex flex-col items-center justify-center">
            <button
              type="button"
              className="btn"
              onClick={() => {
                resetWinners();
                setResetConfirmation(false);
              }}
            >
              Yes
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => setResetConfirmation(false)}
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stats;
