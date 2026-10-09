import { useState, useEffect } from 'react';

export interface ElapsedTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function useElapsedTime(startDate: Date): ElapsedTime | null {
  const [elapsed, setElapsed] = useState<ElapsedTime | null>(null);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const diffMs = now.getTime() - startDate.getTime();

      if (diffMs < 0) {
        setElapsed(null);
        return;
      }

      const totalSeconds = Math.floor(diffMs / 1000);
      const days = Math.floor(totalSeconds / (3600 * 24));
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setElapsed({ days, hours, minutes, seconds });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  return elapsed;
}
