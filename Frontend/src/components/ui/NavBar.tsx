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
import { useMenuItemContext } from '../../contexts/MenuItemContext';
import { useNavigate } from "react-router-dom";

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

const NavBar = () => {

  const {selectedItem, setSelectedItem} = useMenuItemContext();
  const navigate = useNavigate();

  const handleIconClick = (iconName: string) : undefined =>
  {
    setSelectedItem(iconName);
    navigate(`/home/${iconName}`);
  };

  return (
    <div className="navbar min-w-full bg-neutral-100 p-0">
     
        <div className="flex items-center ml-4 mr-8">
          <img src={LogoImage} className="w-10" alt="Mantis Logo" />
          <a className="text-xl text-emerald-700 ml-2">MANTIS</a>
        </div>

        <div className="flex-grow mx-8">
          <input type="search" placeholder="Search" className="flex input input-bordered h-10" />
        </div>

        <div className="flex space-x-8 ml-auto mr-8">
          <MenuItem label="Dashboard" iconName={dashboardIcon} onClick={() => { handleIconClick("dashboard") }} selected={selectedItem === "dashboard"} />
          <MenuItem label="Projects" iconName={projectIcon} onClick={() => { handleIconClick("projects") }} selected={selectedItem === "projects"} />
          <MenuItem label="Tickets" iconName={ticketIcon} onClick={() => { handleIconClick("tickets") }} selected={selectedItem === "tickets"} />
          <MenuItem label="Schedule" iconName={scheduleIcon} onClick={() => { handleIconClick("schedule") }} selected={selectedItem === "schedule"} />
        </div>
     
      <div className="flex mx-4 text-xl">
        <FontAwesomeIcon icon={profileIcon}></FontAwesomeIcon>
      </div>

      
    </div>
  );

}

export default NavBar