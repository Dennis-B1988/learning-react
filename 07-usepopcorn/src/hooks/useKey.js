import { useEffect } from 'react';

function useKey(key, action) {
  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key.toLowerCase() === key.toLowerCase()) {
        action();
      }
    });

    return function cleanup() {
      document.removeEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === key.toLowerCase()) {
          action();
        }
      });
    };
  }, [action, key]);
  return function () {};
}

export default useKey;
