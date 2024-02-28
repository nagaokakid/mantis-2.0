import {MenuItemContext} from './MenuItemContext';
import HomeMenu from './HomeMenu';
import {useState, useContext} from 'react';


const HomeContent: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState("Dashboard");

  return (
    <MenuItemContext.Provider value={{selectedItem, setSelectedItem}}>
      <HomeMenu></HomeMenu>
    </MenuItemContext.Provider>
  )
}

export default HomeContent