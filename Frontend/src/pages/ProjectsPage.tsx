import { useMenuItemContext } from "../contexts/MenuItemContext";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import IProject from "../data/Project";
import { GetAllUserProjectsRequest } from "../requests/ApiRequestHandler";
import LoadingWheel from "../components/ui/LoadingWheel";
import { Table, Button } from "flowbite-react";
import CreateProjectModal from "../components/ui/CreateProjectModal";
import { ToastSuccess } from "../components/ui/Toast";
import { UseToast } from "../hooks/UseToast";
import { SuccessfulUserLoginInfo } from "../data/DTO";
import { useNavigate } from "react-router-dom";

const getAllUserProjects: (userId: string) => Promise<IProject[]> = async (userId) => {
  const response = await GetAllUserProjectsRequest(userId);
  const projects: IProject[] = await response.json();
  return projects;
};

const simplifyDateValue = (dateObj: any): string =>
{
  if (!dateObj)
  {
    return "";
  }

  const newDate = new Date(dateObj);

  return newDate.toLocaleString();
}

const ProjectsPage = () => {
  const {setSelectedItem} = useMenuItemContext();
  const userContext = useContext(UserContext);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [createProjectModal, setCreateProjectModal] = useState(false);
  const {showToast, message, displayToast} = UseToast();
  const navigate = useNavigate();

  // get all projects for a user
  const fetchProjects = async (user: SuccessfulUserLoginInfo) => {
    setIsLoading(true);
    const allProjects = await getAllUserProjects(user.id);
    setProjects(allProjects);
    setIsLoading(false);
  }

  const openModal = () => {
    setCreateProjectModal(true);
  }

  const closeModal = () => {
    setCreateProjectModal(false);
  }

  const handleProjectRowClick = (id: string) => {
    navigate(id);
  }

  // change selected menu item to "projects"
  useEffect(() => {
    setSelectedItem("projects")
  }, []);

  // fetch user projects on initial component mount
  useEffect(() => {
    if (userContext && userContext.user)
    {
      const user: SuccessfulUserLoginInfo = userContext.user;
      fetchProjects(user);
    }
  }, [userContext])

  // update user projects list every time a new project is created
  useEffect(() => {
    if (userContext && userContext.user && showToast)
    {
      const user: SuccessfulUserLoginInfo = userContext.user;
      fetchProjects(user);
    }
  }, [showToast])

  // show spinner while loading or user context is undefined
  if (isLoading || !userContext || !userContext.user)
  {
    return (<LoadingWheel/>)
  }

  return (
    <div>
      {createProjectModal && <CreateProjectModal onClose={closeModal} displayToast={displayToast}/>}
      
      <div className="fixed bottom-4 right-4 z-50">
        {showToast && <ToastSuccess message={message}/>}
      </div>

      <Button
      onClick={openModal}
      className="bg-customGreen hover:bg-buttonHover mt-2 mb-4">Create Project
      </Button>

    <div className="overflow-x-auto">
      <Table hoverable className="w-full">
        <Table.Head>
          <Table.HeadCell>Title</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Created</Table.HeadCell>
          <Table.HeadCell>Start Date</Table.HeadCell>
          <Table.HeadCell>End Date</Table.HeadCell>
          <Table.HeadCell><span className="sr-only">Edit</span></Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {projects.slice().reverse().map((project) => (
            <Table.Row onDoubleClick={() => handleProjectRowClick(project.id)} 
            key={project.id} 
            className="bg-white hover:bg-tableHover dark:border-gray-700 dark:bg-gray-800 whitespace-nowrap font-medium text-gray-900 dark:text-white">
              <Table.Cell className="max-w-sm truncate">{project.title}</Table.Cell>
              <Table.Cell className="max-w-sm truncate">{project.description}</Table.Cell>
              <Table.Cell className="max-w-xs truncate">{project.status}</Table.Cell>
              <Table.Cell className="max-w-sm truncate">{simplifyDateValue(project.created)}</Table.Cell>
              <Table.Cell className="max-w-xs truncate">{simplifyDateValue(project.startDate)}</Table.Cell>
              <Table.Cell className="max-w-xs truncate">{simplifyDateValue(project.endDate)}</Table.Cell>
              <Table.Cell className="max-w-xs truncate"><a href="#" className=" text-blue-600 hover:underline dark:text-cyan-500">Edit</a></Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      
      </Table>
    </div>
    </div>
  )
}

export default ProjectsPage