import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IProject from '../data/Project';
import { GetProjectRequest } from '../requests/ApiRequestHandler';
import { useMenuItemContext } from '../contexts/MenuItemContext';
import { simplifyDateValue } from '../components/data/SimpleDate';
import { Button } from 'flowbite-react';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Link } from 'react-router-dom';
import { UseToast } from '../hooks/UseToast';
// import { UserContext } from '../contexts/UserContext';
import { ToastSuccess } from '../components/ui/Toast';
import CreateTicketModal from '../components/ui/CreateTicketModal';
import { faPenToSquare as editIcon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ProjectDetailsPage = () => {
    const {setSelectedItem} = useMenuItemContext();
    // const userContext = useContext(UserContext);
    const {projectId} = useParams<{projectId: string}>();
    const [projectData, setProjectData] = useState<IProject>();
    const [createTicketModal, setCreateTicketModal] = useState(false);
    const {showToast, message, displayToast} = UseToast();

    useEffect(() => {
        setSelectedItem("projects");
    }, [])

    useEffect(() => {
        const getProject = async () => {

            if (projectId)
            {
                const response = await GetProjectRequest(projectId);
                const project: IProject = await response.json();
                setProjectData(project);
            }
        }
        getProject();
    }, [])

    const openModal = () => {
        setCreateTicketModal(true);
    }
    const closeModal = () => {
        setCreateTicketModal(false);
    }
    
    return (
   

    <div className="space-y-8">

        {/* Row 1 - Project details and participants */}
        <div className="flex flex-row">
            {/* Column 1 - Project details */}
            <div className="flex flex-col space-y-8 min-w-56 w-1/2 max-w-[50%]">
            <Link to="/home/projects" className="text-link hover:underline">{`< Back to Projects`}</Link>
                <div className="bg-gray-100 space-y-2 p-4 rounded-xl">
                <div className="space-y-2">
                    <div className="flex flex-row space-x-2 w-full">
                        <h1 className="text-2xl font-bold max-w-[60%]">{projectData?.title}</h1>
                        <StatusBadge status={projectData?.status} size="xs"/>
                        <div className="flex flex-grow justify-end">
                            <Button
                            size="2xl"
                            className="flex text-lg px-4 py-2 min-w-20 w-fit h-fit bg-customGreen hover:bg-buttonHover text-center items-center"
                            onClick={openModal}>
                            Add Ticket
                            </Button>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500">{`Created on ${simplifyDateValue(projectData?.created)}`}</p>
                </div>
                <p> {projectData?.description} </p>
                <div className="space-y-2 pt-4 text-sm text-gray-600">
                    <h1>{`Start Date: ${projectData?.startDate ? projectData.startDate : ""}`}</h1>
                    <div className="flex flex-row w-full">
                        <h1>{`End Date: ${projectData?.endDate ? projectData.endDate : ""}`}</h1>
                        <div className="flex flex-grow justify-end text-xl">
                            <FontAwesomeIcon icon={editIcon}/>
                        </div>
                    </div>
                    
                </div>
                </div>
                
            </div>

            {/*  Column 2 - Participants */}
            <div className="flex flex-col w-full min-w-56 max-w-[50vw] pl-8">
                <h1 className="text-2xl w-full text-center">Participants</h1>
            </div>
        </div>

        {createTicketModal && <CreateTicketModal 
        onClose={closeModal} 
        displayToast={displayToast} 
        project={projectData}
        fromProjectPage={true}/>}

        <div className="fixed bottom-4 right-4 z-50">
        {showToast && <ToastSuccess message={message}/>}
        </div>

    </div>
    
  )
}

export default ProjectDetailsPage