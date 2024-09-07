import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import {useMenuItemContext} from '../contexts/MenuItemContext';
import BarGraph from "../components/ui/BarGraph";
import Card from "../components/ui/Card";
import Calendar from "../components/ui/Calendar";

const DashboardPage = () => {
  const userContext = useContext(UserContext);
  const {setSelectedItem} = useMenuItemContext();

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
      
      {/* First Row - greeting */}
      <h1 className="text-xl">{greeting}</h1>
      
      {/* Second Row - calendar, bar graph, and project + ticket cards */}
      <div className="flex flex-row space-x-10">
        <Calendar/>
        <BarGraph/>
        <div className="flex flex-col space-y-10">
          <Card title="Projects" bodyText="Total: " 
          linkText="View All" linkRoute="/home/projects"
          createButton={true}/>
          <Card title="Tickets" bodyText="Total: " 
          linkText="View All" linkRoute="/home/tickets"
          createButton={true}/>
        </div>
      </div>

      {/* Third Row - */}
      <h1 className="text-3xl py-4">Recent Activity</h1>

    </div>
  );
};

export default DashboardPage;
