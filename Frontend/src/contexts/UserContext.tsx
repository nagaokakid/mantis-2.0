import React, { createContext, useEffect, useState } from 'react';
import { SuccessfulUserLoginInfo, UserBasicInfo } from '../data/DTO';

// Define the context type
interface UserContextProps {
  user: SuccessfulUserLoginInfo | null;
  setUser: (user: SuccessfulUserLoginInfo | UserBasicInfo | null) => void;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<SuccessfulUserLoginInfo | null>(null);

  // run once when component is mounted
  useEffect(() => {
    const storedUser = localStorage.getItem('user');  // check if user info is already stored
    if (storedUser) {
      setUser(JSON.parse(storedUser));  // if already stored, change state variable to match local storage object
    }
  }, []);

  // run every time "user" state variable changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user)); // place user info in local storage if assigned to valid type
    } else {
      localStorage.removeItem('user'); // else, remove from local storage if null
    }
  }, [user]);

  // make context available to all child nodes
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );

};