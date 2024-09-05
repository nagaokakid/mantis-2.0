import React, { createContext, useState, ReactNode } from 'react';

// Define the type for the context
interface MenuItemContextType {
  selectedItem: string;
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
}

// Create the context
const MenuItemContext = createContext<MenuItemContextType | undefined>(undefined);

interface MenuItemProviderProps {
  children: ReactNode;
}

// Provider to be wrapped at highest level of App
export const MenuItemProvider: React.FC<MenuItemProviderProps> = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState<string>('dashboard'); // Default state

  return (
    <MenuItemContext.Provider value={{ selectedItem, setSelectedItem }}>
      {children}
    </MenuItemContext.Provider>
  );
};

// Custom hook to use the MenuItemContext
export const useMenuItemContext = () => {
  const context = React.useContext(MenuItemContext);
  if (!context) {
    throw new Error("useMenuItemContext must be used within a MenuItemProvider");
  }
  return context;
};
