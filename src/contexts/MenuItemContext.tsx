import { createContext, Dispatch, SetStateAction } from "react";

export interface IMenuItemContext {
  selectedItem: string;
  setSelectedItem: Dispatch<SetStateAction<string>>;
}

const defaultState: IMenuItemContext = {
  selectedItem: "Dashboard",
  setSelectedItem: () => {}
};

export const MenuItemContext = createContext<IMenuItemContext>(defaultState);