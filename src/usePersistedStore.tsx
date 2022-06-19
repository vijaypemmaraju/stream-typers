import create from 'zustand';
import { persist } from 'zustand/middleware';

type Store = {
  streamer: string;
  setStreamer: (streamer: string) => void;
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
  categoryFrequencySettings: {
    [key: string]: number;
  };
  updateCategoryFrequencySetting: (key: string, value: number) => void;
};

// eslint-disable-next-line import/prefer-default-export

const usePersistedStore = create<Store>(
  persist(
    (set, get) => ({
      streamer: '',
      setStreamer: streamer => set({ streamer }),
      accessToken: '',
      setAccessToken: accessToken => set({ accessToken }),
      categoryFrequencySettings: {
        Unscramble: 2,
        Flags: 2,
        Math: 2,
        Riddle: 2,
        Trivia: 2,
        Capitals: 2,
        Countries: 2,
      },
      updateCategoryFrequencySetting: (category, value) => {
        const { categoryFrequencySettings } = get();
        set({
          categoryFrequencySettings: {
            ...categoryFrequencySettings,
            [category]: value,
          },
        });
      },
    }),
    { name: 'store' },
  ),
);

export default usePersistedStore;
