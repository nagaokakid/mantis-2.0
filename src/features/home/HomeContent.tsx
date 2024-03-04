import {MenuItemContext} from '../../contexts/MenuItemContext';
import HomeMenu from './HomeMenu';
import {useState} from 'react';
import Dashboard from '../dashboard/Dashboard';
import HomeNavBar from './HomeNavBar';


const HomeContent: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState("Dashboard");

  return (

    <MenuItemContext.Provider value={{selectedItem, setSelectedItem}}>

      <div className="flex flex-col">

        <div className="sticky top-0 left-0 z-50 w-full">
          <HomeNavBar></HomeNavBar>
        </div>

        <div className="w-full">
          <div className="fixed flex-none min-w-fit h-screen">
            <HomeMenu></HomeMenu>
          </div>
          <div className="flex-1 flex-wrap ml-44 mr-6 my-4 break-words">
            <Dashboard/>
          </div>
          
        </div>

      </div>

      {/* <div className="fixed flex flex-col top-0 left-0 h-screen w-screen">
       
        <div className="flex-none">
          <NavBar></NavBar>
        </div>

        <div className="flex min-h-full">
          <div className="flex-none min-w-fit">
            <HomeMenu></HomeMenu>
          </div>
          <div className="flex-1 flex-wrap break-words max-w-full overflow-y-scroll">
            {selectedItem === "Dashboard" && <Dashboard/>}
          </div>
        </div>

      </div> */}
    </MenuItemContext.Provider>
  )
}

export default HomeContent