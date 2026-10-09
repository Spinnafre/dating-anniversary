import { useState, useEffect, useRef } from 'react';

export function useTypewriter(fullText: string, speed = 35) {
  const [displayedText, setDisplayedText] = useState('');
  const [isFinished, setIsFinished] = useState(false);

  const indexRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    indexRef.current = 0;
    setDisplayedText('');
    setIsFinished(false);

    timerRef.current = setInterval(() => {
      if (indexRef.current < fullText.length) {
        indexRef.current++;
        setDisplayedText(fullText.slice(0, indexRef.current));
      } else {
        setIsFinished(true);
        if (timerRef.current) clearInterval(timerRef.current);
      }
    }, speed);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [fullText, speed]);

  const skip = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    indexRef.current = fullText.length;
    setDisplayedText(fullText);
    setIsFinished(true);
  };

  return { displayedText, isFinished, skip };
}
