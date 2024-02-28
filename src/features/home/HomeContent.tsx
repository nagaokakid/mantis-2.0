import {MenuItemContext} from './MenuItemContext';
import HomeMenu from './HomeMenu';
import {useState, useContext} from 'react';
import Dashboard from './Dashboard';


const HomeContent: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState("Dashboard");

  return (
    <div className="flex max-w-screen overflow-x-hidden">
    <MenuItemContext.Provider value={{selectedItem, setSelectedItem}}>
      <HomeMenu></HomeMenu>
      <div className="mx-4 my-2">
      {selectedItem === "Dashboard" && <Dashboard/>}
      {selectedItem === "Projects"}
      </div>
    </MenuItemContext.Provider>
    </div>
  )
}

export default HomeContent