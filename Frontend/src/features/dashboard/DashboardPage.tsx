import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import {useMenuItemContext} from '../../contexts/MenuItemContext';
import BarGraph from "../../components/ui/BarGraph";

const DashboardPage = () => {
  const userContext = useContext(UserContext);
  const {setSelectedItem} = useMenuItemContext();

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
  const greeting: string = `Welcome, ${user?.firstName || ""} ${user?.lastName || ""}!`;


  return (
    <div className="max-w-full">
      <h1 className="text-2xl mb-4">{greeting}</h1>
      <div className="flex flex-row space-x-10">
        <BarGraph/>

      </div>

    </div>
  );
};

export default DashboardPage;
