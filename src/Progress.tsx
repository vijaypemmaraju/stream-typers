import React, { FC, useEffect, useRef, useState } from 'react';

type ProgressProps = {
  amount?: number;
  onComplete: () => void;
};

const Progress: FC<ProgressProps> = ({ amount = 30, onComplete }) => {
  const [progress, setProgress] = useState(amount);

  const progressRef = useRef(progress);

  useEffect(() => {
    progressRef.current = progress;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => p - 0.1);
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
      max={amount}
    />
  );
};

export default Progress;
