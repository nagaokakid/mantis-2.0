import React, { createContext, useEffect, useState } from 'react';
import { SuccessfulUserLoginInfo } from '../data/DTO';

// Define the context type
interface UserContextProps {
  user: SuccessfulUserLoginInfo | null;
  setUser: (user: SuccessfulUserLoginInfo | null) => void;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<SuccessfulUserLoginInfo | null>(null);

  // run once when component is mounted
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // run every time "user" state variable changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // make context available to all child nodes
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );

};