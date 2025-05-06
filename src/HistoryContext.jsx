// HistoryContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { svrURL } from './constants';

const HistoryContext = createContext();

export function HistoryProvider({ children }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch(`${svrURL}/user/history`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          setHistory(data);
        } catch (err) {
          console.error(err);
        }
      }
    };

    fetchHistory();
  }, []);

  // ✅ NEW: Add watched episode dynamically
  const addToHistory = (episodeId) => {
    setHistory((prev) => {
      if (!prev.some((item) => item.episodeId === episodeId)) {
        return [...prev, { episodeId }];
      }
      return prev;
    });
  };

  return (
    <HistoryContext.Provider value={{ history, addToHistory }}>
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory() {
  return useContext(HistoryContext);
}
