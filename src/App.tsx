import React, { FC, useEffect } from 'react';
import { ChatClient } from '@twurple/chat';
import useStore from './useStore';
import usePersistedStore from './usePersistedStore';
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
