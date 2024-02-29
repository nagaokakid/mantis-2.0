import {MenuItemContext} from '../../contexts/MenuItemContext';
import HomeMenu from './HomeMenu';
import {useState, useContext} from 'react';
import Dashboard from '../dashboard/Dashboard';
import NavBar from '../navbar/NavBar';


const HomeContent: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState("Dashboard");

  return (
    <div className="flex flex-col sticky h-screen">
      <MenuItemContext.Provider value={{selectedItem, setSelectedItem}}>
        
        <NavBar></NavBar>

        <div className="flex flex-grow">
          <HomeMenu></HomeMenu>
          <div className="flex-1 my-4 mx-4">
            {selectedItem === "Dashboard" && <Dashboard/>}
            {selectedItem === "Projects"}
          </div>

        </div>
      
    </MenuItemContext.Provider>
    </div>
  )
}

export default HomeContent