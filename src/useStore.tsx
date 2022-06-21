import create from 'zustand';
import randomColor from 'randomcolor';
import words from './words.json';

type GameState =
  | 'beginning_round'
  | 'round_in_progress'
  | 'round_complete'
  | 'game_complete';

type Store = {
  users: string[];
  userPoints: { [key: string]: number };
  userColors: { [key: string]: string };
  userIcons: { [key: string]: string };
  addPointsForUser: (user: string, points: number) => void;
  addColorForUser: (user: string) => void;
  setIconForUser: (user: string, icon: string) => void;
  mode: 'lobby' | 'game';
  gameState: GameState;
  setGameState: (gameState: GameState) => void;
  randomWordIndex: number;
  setUsers: (users: string[]) => void;
  setMode: (mode: 'lobby' | 'game') => void;
  winner: string | null;
  setWinner: (winner: string | null) => void;
  setRandomWordIndex: (randomWordIndex: number) => void;
};

// eslint-disable-next-line import/prefer-default-export

const useStore = create<Store>((set, get) => ({
  users: [
    // 'elevatelol', //
  ],
  userPoints: {},
  userColors: {
    // elevatelol: randomColor({ luminosity: 'light' }),
  },
  userIcons: {},
  addPointsForUser: (user: string, points: number) => {
    const { userPoints } = get();
    set({
      userPoints: {
        ...userPoints,
        [user]: (userPoints[user] || 0) + points,
      },
    });
  },
  addColorForUser: (user: string) => {
    const { userColors } = get();
    set({
      userColors: {
        ...userColors,
        [user]: randomColor({ luminosity: 'light' }),
      },
    });
  },
  setIconForUser: (user: string, icon: string) => {
    const { userIcons } = get();
    set({
      userIcons: {
        ...userIcons,
        [user]: icon,
      },
    });
  },
  mode: 'lobby',
  gameState: 'beginning_round',
  setGameState: gameState => set({ gameState }),
  randomWordIndex: Math.floor(Math.random() * words.length),
  setUsers: users => set({ users }),
  setMode: mode => set({ mode }),
  winner: null,
  setWinner: winner => set({ winner }),
  setRandomWordIndex: randomWordIndex => set({ randomWordIndex }),
}));

export default useStore;
