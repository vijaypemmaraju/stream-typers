import usePersistedStore from './usePersistedStore';

const playAudio = (
  fileName: string,
  volume: number = 1,
  playbackRate: number = 1,
) => {
  const audio = new Audio(fileName);
  audio.volume = (volume * usePersistedStore.getState().masterVolume) / 100;
  audio.playbackRate = playbackRate;
  audio.play();
};

export default playAudio;
