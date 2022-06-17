import create from 'zustand';
import { persist } from 'zustand/middleware';

type Store = {
  streamer: string;
  setStreamer: (streamer: string) => void;
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
};

// eslint-disable-next-line import/prefer-default-export

const usePersistedStore = create<Store>(
  persist(
    set => ({
      streamer: '',
      setStreamer: streamer => set({ streamer }),
      accessToken: '',
      setAccessToken: accessToken => set({ accessToken }),
    }),
    { name: 'store' },
  ),
);

export default usePersistedStore;
