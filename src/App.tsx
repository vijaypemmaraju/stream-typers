import React, { FC, useEffect } from 'react';
import { ChatClient } from '@twurple/chat';
import useStore from './useStore';
import usePersistedStore from './usePersistedStore';
import Game from './Game';
import Lobby from './Lobby';

const App: FC = () => {
  const addColorForUser = useStore(store => store.addColorForUser);
  const mode = useStore(store => store.mode);
  const setUsers = useStore(store => store.setUsers);

  const streamer = usePersistedStore(store => store.streamer);

  useEffect(() => {
    const loader = async () => {
      const chatClient = new ChatClient({
        channels: [streamer],
        logger: {
          custom: console.log,
          minLevel: 0,
        },
      });
      chatClient.connect().then(() => {
        chatClient.onMessage(
          async (_channel: string, _user: string, message: string, msg) => {
            // eslint-disable-next-line no-shadow
            const { mode, users } = useStore.getState();
            const userName = msg.userInfo.displayName.toLowerCase();
            if (mode === 'lobby') {
              if (message === '!join') {
                // if (userName === streamer) {
                //   return;
                // }
                if (users.length >= 20) {
                  return;
                }
                users.push(userName);
                addColorForUser(userName);
              }
              setUsers(Array.from(new Set(users)));
            } else if (mode === 'game') {
              // do nothing
            }
          },
        );
      });
    };
    loader();
  }, [streamer]);

  return (
    <div className="flex flex-col justify-center items-center prose">
      {mode === 'lobby' && <Lobby />}
      {mode === 'game' && <Game />}
    </div>
  );
};

export default App;
