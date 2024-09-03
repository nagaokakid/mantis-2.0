import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SuccessfulUserLoginInfo } from '../data/DTO';

// Define the context type
interface UserContextType {
  user: SuccessfulUserLoginInfo | null;
  setUser: React.Dispatch<React.SetStateAction<SuccessfulUserLoginInfo | null>>;
}

// Create a Context with default values
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<SuccessfulUserLoginInfo | null>(null); // Initialize user state

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to use the UserContext
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};