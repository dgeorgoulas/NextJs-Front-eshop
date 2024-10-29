"use client";
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({ id: null, token: null });

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
   
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem('userData');
      return storedUser ? JSON.parse(storedUser) : { id: null, token: null };
    }
    return { id: null, token: null };
  });

  useEffect(() => {
    if (userData && userData.id) {
      localStorage.setItem('userData', JSON.stringify(userData));
    } else {
      localStorage.removeItem('userData');
    }
  }, [userData]);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

