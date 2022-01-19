import { useEffect, useState } from 'react';

export const useKeyPress = (targetKey: string, condition: boolean) => {
  const [iskeyPressed, setIsKeyPressed] = useState(false);

  useEffect(() => {
    const onKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === targetKey) {
        evt.preventDefault();
        setIsKeyPressed(true);
      }
    };

    const onKeyUp = (evt: KeyboardEvent) => {
      if (evt.key === targetKey) {
        evt.preventDefault();
        setIsKeyPressed(false);
      }
    };

    if (condition) {
      document.addEventListener('keydown', onKeyDown);
      document.addEventListener('keyup', onKeyUp);
    }
    else {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
    }

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
    };
  },
  [condition, targetKey]);

  return iskeyPressed;
};
