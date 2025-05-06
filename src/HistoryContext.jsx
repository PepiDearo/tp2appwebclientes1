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

  return (
    <HistoryContext.Provider value={{ history }}>
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory() {
  return useContext(HistoryContext);
}
