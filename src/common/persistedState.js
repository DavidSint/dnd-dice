import { useState, useEffect } from 'react'

function usePersistedState(key, defaultValue) {
  const [state, setState] = useState(
    () => {
      try {
        return JSON.parse(localStorage.getItem(key)) || defaultValue;
      } catch { 
        return defaultValue;
      }
    }
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
}

export default usePersistedState
