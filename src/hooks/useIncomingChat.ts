import { ChatClient } from '@twurple/chat';
import { TwitchPrivateMessage } from '@twurple/chat/lib/commands/TwitchPrivateMessage';
import { useEffect } from 'react';
import usePersistedStore from '../usePersistedStore';

const useIncomingChat = (
  cb: (
    channel: string,
    user: string,
    message: string,
    msg: TwitchPrivateMessage,
  ) => void,
) => {
  const streamer = usePersistedStore(store => store.streamer);

  useEffect(() => {
    const chatClient = new ChatClient({
      channels: [streamer],
      logger: {
        custom: console.log,
        minLevel: 0,
      },
    });
    chatClient.connect().then(() => {
      chatClient.onMessage(cb);
    });
  }, []);
};

export default useIncomingChat;
