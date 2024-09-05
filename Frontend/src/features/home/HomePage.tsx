import {MenuItemContext} from '../../contexts/MenuItemContext';
import {useState} from 'react';
import Dashboard from '../dashboard/DashboardPage';
import HomeNavBar from './HomeNavBar';
import Projects from '../projects/ProjectsPage';


const HomeContent: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState("Dashboard");

  return (
      <MenuItemContext.Provider value={{selectedItem, setSelectedItem}}>

        <div className="flex flex-col min-w-full max-w-{100%}">

          <div className="sticky top-0 left-0 z-50 min-w-fit">
            <HomeNavBar/>
          </div>

          <div className="w-full break-words p-4">
              {selectedItem === "Dashboard" && <Dashboard/>}
              {selectedItem === "Projects" && <Projects/>}
          </div>

        </div>
      </MenuItemContext.Provider>
  )
}

export default HomeContent