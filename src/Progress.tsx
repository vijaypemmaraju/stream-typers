import React, { FC, useEffect, useRef, useState } from 'react';

type ProgressProps = {
  tick?: number;
  onComplete: () => void;
};

const Progress: FC<ProgressProps> = ({ tick = 0.2, onComplete }) => {
  const [progress, setProgress] = useState(100);

  const progressRef = useRef(progress);

  useEffect(() => {
    progressRef.current = progress;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => p - tick);
      if (progressRef.current <= 0) {
        clearInterval(interval);
        onComplete();
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);
  return (
    <progress
      className="progress progress-primary w-[80%] transition-all"
      style={{
        transition: 'value 5s ease',
      }}
      value={progress}
      max="100"
    />
  );
};

export default Progress;
