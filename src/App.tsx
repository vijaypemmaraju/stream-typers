import React, { FC } from 'react';
import useStore from './useStore';
import Game from './Game';
import Lobby from './Lobby';

const App: FC = () => {
  const mode = useStore(store => store.mode);

  return (
    <div className="flex flex-col items-center justify-center prose">
      {mode === 'lobby' && <Lobby />}
      {mode === 'game' && <Game />}
    </div>
  );
};

export default App;
