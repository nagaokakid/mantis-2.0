import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import {useMenuItemContext} from '../contexts/MenuItemContext';
import BarGraph from "../components/ui/BarGraph";
import Card from "../components/ui/Card";
import Calendar from "../components/ui/Calendar";
import CreateProjectModal from "../components/ui/CreateProjectModal";
import { ToastSuccess } from "../components/ui/Toast"
import { UseToast } from "../hooks/UseToast"
import LoadingWheel from "../components/ui/LoadingWheel";
import CreateTicketModal from "../components/ui/CreateTicketModal";
import { GetUserBasicInfoRequest } from "../requests/ApiRequestHandler";
import { UserBasicInfo } from "../data/DTO";

const DashboardPage = () => {
  const userContext = useContext(UserContext);
  const {setSelectedItem} = useMenuItemContext();
  const [createProjectModal, setCreateProjectModal] = useState(false);
  const [createTicketModal, setCreateTicketModal] = useState(false);
  const {showToast, message, displayToast} = UseToast();

  const fetchUserBasicInfo: (userId: string) => Promise<UserBasicInfo> = async (userId) => {
    const response = await GetUserBasicInfoRequest(userId);
    const userBasicInfo: UserBasicInfo = await response.json();
    return userBasicInfo;
  }

  const openProjectModal = () => {
    setCreateProjectModal(true);
  }
  const closeProjectModal = () => {
    setCreateProjectModal(false);
  }
  const openTicketModal = () => {
    setCreateTicketModal(true);
  }
  const closeTicketModal = () => {
    setCreateTicketModal(false);
  }

  useEffect(() => {
    setSelectedItem("dashboard")
  }, []);

  // If user context info is null or undefined, show a loading spinner and wait until defined
  if (!userContext) {
    return (
      <LoadingWheel/>
    );
  }

  const {user, setUser} = userContext;

  useEffect(() => {
    const updateUserBasicInfo = async () => {
      if (user)
        {
          const userBasicInfo = await fetchUserBasicInfo(user.id);
          setUser(userBasicInfo);
        }
    }
    updateUserBasicInfo();
  }, []);

  // Gather user details once context is made available
  const greeting: string = `Welcome${user?.firstName ? ", " + user.firstName + "!" : "! We're glad to have you here."}`;


  return (
    
    <div className="max-w-full space-y-4">
      
      {/* First Row - greeting */}
      <h1 className="text-xl">{greeting}</h1>
      
      {/* Second Row - calendar, bar graph, and project + ticket cards */}
      <div className="flex flex-row space-x-10">
        <Calendar/>
        <BarGraph/>
        <div className="flex flex-col py-8 space-y-10">
          <Card title="Projects" bodyText="Total: " 
          linkText="View All" linkRoute="/home/projects"
          createButton={true}
          createButtonAction={openProjectModal}/>
          <Card title="Tickets" bodyText="Total: " 
          linkText="View All" linkRoute="/home/tickets"
          createButton={true}
          createButtonAction={openTicketModal}/>
        </div>
      </div>

      {/* Third Row - */}
      <h1 className="text-3xl py-4">Recent Activity</h1>

      {/* Create project window */}
      {createProjectModal && <CreateProjectModal 
      onClose={closeProjectModal} 
      displayToast={displayToast}/>}

      {/* Create ticket window */}
      {createTicketModal && <CreateTicketModal 
      onClose={closeTicketModal} 
      displayToast={displayToast}
      project={undefined}
      fromProjectPage={false}/>}

      <div className="fixed bottom-4 right-4 z-50">
        {showToast && <ToastSuccess message={message}/>}
      </div>

    </div>
  );
};

export default DashboardPage;
