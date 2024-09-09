import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import {useMenuItemContext} from '../contexts/MenuItemContext';
import BarGraph from "../components/ui/BarGraph";
import Card from "../components/ui/Card";
import Calendar from "../components/ui/Calendar";
import CreateProjectModal from "../components/ui/CreateProjectModal";
import { ToastSuccess } from "../components/ui/Toast"
import { UseToast } from "../hooks/UseToast"

const DashboardPage = () => {
  const userContext = useContext(UserContext);
  const {setSelectedItem} = useMenuItemContext();
  const [createProjectModal, setCreateProjectModal] = useState(false);
  const {showToast, message, displayToast} = UseToast();

  const openModal = () => {
    setCreateProjectModal(true);
  }

  const closeModal = () => {
    setCreateProjectModal(false);
  }

  setSelectedItem("dashboard")

  // If user context info is null or undefined, show a loading spinner
  if (!userContext) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const {user} = userContext;

  // Gather user details once context is made available
  const greeting: string = `Welcome, ${user?.firstName || ""}!`;


  return (
    
    <div className="max-w-full space-y-4">

      {createProjectModal && <CreateProjectModal onClose={closeModal} displayToast={displayToast}/>}
      
      <div className="fixed bottom-4 right-4 z-50">
        {showToast && <ToastSuccess message={message}/>}
      </div>
      
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
          createButtonAction={openModal}/>
          <Card title="Tickets" bodyText="Total: " 
          linkText="View All" linkRoute="/home/tickets"
          createButton={true}
          />
        </div>
      </div>

      {/* Third Row - */}
      <h1 className="text-3xl py-4">Recent Activity</h1>

    </div>
  );
};

export default DashboardPage;
