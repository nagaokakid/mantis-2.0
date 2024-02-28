import {useContext} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser as profileIcon, 
  faGauge as dashboardIcon, 
  faDiagramProject as projectIcon,
  faTicket as ticketIcon,
  faCalendarDays as scheduleIcon,
  faRightFromBracket as signoutIcon} 
  from '@fortawesome/free-solid-svg-icons';
import {MenuItemContext} from '../../contexts/MenuItemContext';

const HomeMenu = () => {

  const {selectedItem, setSelectedItem} = useContext(MenuItemContext);

  const handleIconClick = (iconName: string) : undefined =>
  {
    setSelectedItem(iconName);
  };

  const getSelectedIcon = (iconName: string) : string =>
  {
    return selectedItem === iconName ? "bg-green-500 rounded text-gray-100" : "hover:bg-gray-300 rounded";
  };


  return (
    
    <div className="flex flex-col justify-between min-w-fit h-screen">
      <ul className="menu-vertical bg-base-200 px-4 pt-4 space-y-4 flex flex-col flex-grow text-md">
        <li className={`flex hover:cursor-pointer ${getSelectedIcon("Dashboard")}`} onClick={() => handleIconClick("Dashboard")}>
          <div className="space-x-2 px-2 py-2">
            <FontAwesomeIcon icon={dashboardIcon} />
            <a>Dashboard</a>
          </div>
        </li>
        <li className={`flex hover:cursor-pointer ${getSelectedIcon("Projects")}`} onClick={() => handleIconClick("Projects")}>
        <div className="space-x-2 px-2 py-2">
            <FontAwesomeIcon icon={projectIcon} />
            <a>Projects</a>
          </div>
        </li>
        <li className={`flex hover:cursor-pointer ${getSelectedIcon("Tickets")}`} onClick={() => handleIconClick("Tickets")}>
        <div className="space-x-2 px-2 py-2">
            <FontAwesomeIcon icon={ticketIcon} />
            <a>Tickets</a>
          </div>
        </li>
        <li className={`flex hover:cursor-pointer ${getSelectedIcon("Schedule")}`} onClick={() => handleIconClick("Schedule")}>
        <div className="space-x-2 px-2 py-2">
            <FontAwesomeIcon icon={scheduleIcon} />
            <a>Schedule</a>
          </div>
        </li>
        <li className={`flex hover:cursor-pointer ${getSelectedIcon("Profile")}`} onClick={() => handleIconClick("Profile")}>
        <div className="space-x-2 px-2 py-2">
            <FontAwesomeIcon icon={profileIcon} />
            <a>Profile</a>
          </div>
        </li>
      </ul>
      <ul className="menu-vertical bg-base-200 px-4 pt-4 space-y-4 flex flex-col flex-grow text-md">
        <li className={`flex mt-auto my-4 hover:cursor-pointer ${getSelectedIcon("Logout")}`} onClick={() => handleIconClick("Logout")}>
        <div className="space-x-2 px-2 py-2">
            <a className="mr-2">Sign Out</a>
            <FontAwesomeIcon icon={signoutIcon}/>
          </div>
          </li>
      </ul>
    </div>
  )
}

export default HomeMenu