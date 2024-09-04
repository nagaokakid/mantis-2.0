import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";

const Dashboard = () => {
  const userContext = useContext(UserContext);
  // const [userInfo, setUserInfo] = useState(userContext?.user);

  // useEffect(() => {
  //   console.log("useEffect triggered, userContext.user:", userContext?.user);
  //   if (userContext?.user) {
  //     setUserInfo(userContext.user);
  //   }
  // }, [userContext?.user]);

  // If userInfo is null or undefined, show a loading spinner
  if (!userContext) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const {user} = userContext;

  // Once userInfo is available, gather user info
  const greeting: string = `Welcome ${user?.firstName || ""} ${user?.lastName || ""}`;

  return (
    <div>
      <h1>{greeting}</h1>
    </div>
  );
};

export default Dashboard;
