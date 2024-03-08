import {MenuItemContext} from '../../contexts/MenuItemContext';
import HomeMenu from './HomeMenu';
import {useState} from 'react';
import Dashboard from '../dashboard/Dashboard';
import HomeNavBar from './HomeNavBar';


const HomeContent: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState("Dashboard");

  return (

    <MenuItemContext.Provider value={{selectedItem, setSelectedItem}}>

      <div className="flex flex-col max-w-{100%}">

        <div className="sticky top-0 left-0 z-50 min-w-fit">
          <HomeNavBar></HomeNavBar>
        </div>

        <div className="w-full break-words">
            {selectedItem === "Dashboard" && <Dashboard/>}
        </div>

      </div>
    </MenuItemContext.Provider>
  )
}

export default HomeContent