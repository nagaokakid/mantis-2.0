import {MenuItemContext} from '../../contexts/MenuItemContext';
import {useState} from 'react';
import Dashboard from '../dashboard/Dashboard';
import HomeNavBar from './HomeNavBar';
import Projects from '../projects/Projects';


const HomeContent: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState("Dashboard");

  return (
      <MenuItemContext.Provider value={{selectedItem, setSelectedItem}}>

        <div className="flex flex-col min-w-full max-w-{100%}">

          <div className="sticky top-0 left-0 min-w-fit">
            <HomeNavBar/>
          </div>

          <div className="w-full break-words px-4 py-4">
              {selectedItem === "Dashboard" && <Dashboard/>}
              {selectedItem === "Projects" && <Projects/>}
          </div>

        </div>
      </MenuItemContext.Provider>
  )
}

export default HomeContent