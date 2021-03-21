import React, { useState, useEffect, Dispatch } from 'react'

export default function usePersistedState<T>(key: string, defaultValue: T): [T, Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState(
    () => {
      try {
        return JSON.parse(localStorage.getItem(key) || "") || defaultValue;
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
