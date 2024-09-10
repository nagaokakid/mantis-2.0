import { useMenuItemContext } from "../contexts/MenuItemContext";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import IProject from "../data/Project";
import { GetAllUserProjectsRequest } from "../requests/ApiRequestHandler";
import LoadingWheel from "../components/ui/LoadingWheel";

const getAllUserProjects: (userId: string) => Promise<IProject[]> = async (userId) => {
  const response = await GetAllUserProjectsRequest(userId);
  const projects: IProject[] = await response.json();
  return projects;
};

const ProjectsPage = () => {
  const {setSelectedItem} = useMenuItemContext();
  const userContext = useContext(UserContext);

  // change selected menu item to "projects"
  useEffect(() => {
    setSelectedItem("projects")
  }, []);

  if (!userContext)
  {
    return (<LoadingWheel/>)
  }

  // user data (id, name, counts)
  const {user} = userContext;

  if (!user)
  {
    return (<LoadingWheel/>)
  }

  const allProjects: Promise<IProject[]> = getAllUserProjects(user.id);

  return (
    <div>
    </div>
  )
}

export default ProjectsPage