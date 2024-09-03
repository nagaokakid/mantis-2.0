import LogoImage from "../../assets/mantis_logo.png"
import {useContext} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser as profileIcon, 
  faGauge as dashboardIcon, 
  faDiagramProject as projectIcon,
  faTicket as ticketIcon,
  faCalendarDays as scheduleIcon,
  // faRightFromBracket as signoutIcon,
  IconDefinition} 
  from '@fortawesome/free-solid-svg-icons';
import {MenuItemContext} from '../../contexts/MenuItemContext';

interface MenuItemProps {
  label: string,
  iconName: IconDefinition,
  onClick: () => void,
  selected: boolean
}

const MenuItem: React.FC<MenuItemProps> = ({label, iconName, onClick, selected}) => (
  <div className={`flex items-center hover:cursor-pointer space-x-2 p-2 text-sm 
  ${selected ? "bg-green-500 rounded text-gray-100 scale-110" : 
  "hover:bg-gray-300 rounded transition duration-300 ease-in-out transform hover:scale-110"}`}
  onClick={onClick}>
    <FontAwesomeIcon icon={iconName}/>
    <a>{label}</a>
  </div>
)

const HomeNavBar = () => {

  const {selectedItem, setSelectedItem} = useContext(MenuItemContext);

  const handleIconClick = (iconName: string) : undefined =>
  {
    setSelectedItem(iconName);
  };

  return (
    <div className="navbar min-w-full bg-neutral-200 p-0">
     
        <div className="flex mr-20 ml-4">
          <img src={LogoImage} className="w-10" alt="Mantis Logo" />
          <a className="text-xl text-emerald-600 ml-2">MANTIS</a>
        </div>

        <div className="flex flex-grow space-x-8">
          <MenuItem label="Dashboard" iconName={dashboardIcon} onClick={() => { handleIconClick("Dashboard") }} selected={selectedItem === "Dashboard"} />
          <MenuItem label="Projects" iconName={projectIcon} onClick={() => { handleIconClick("Projects") }} selected={selectedItem === "Projects"} />
          <MenuItem label="Tickets" iconName={ticketIcon} onClick={() => { handleIconClick("Tickets") }} selected={selectedItem === "Tickets"} />
          <MenuItem label="Schedule" iconName={scheduleIcon} onClick={() => { handleIconClick("Schedule") }} selected={selectedItem === "Schedule"} />
        </div>
      
        <div className="flex form-control">
          <input type="search" placeholder="Search" className="flex input input-bordered h-10" />
        </div>
     
      <div className="flex ml-8 mr-4 space-x-4 text-xl">
        <FontAwesomeIcon icon={profileIcon}></FontAwesomeIcon>
      </div>

      
    </div>
  );

}

export default HomeNavBar