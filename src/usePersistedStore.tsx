import create from 'zustand';
import { persist } from 'zustand/middleware';

type Store = {
  streamer: string;
  setStreamer: (streamer: string) => void;
};

// eslint-disable-next-line import/prefer-default-export

const usePersistedStore = create<Store>(
  persist(
    set => ({
      streamer: '',
      setStreamer: streamer => set({ streamer }),
    }),
    { name: 'store' },
  ),
);

export default usePersistedStore;
