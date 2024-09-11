import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IProject from '../data/Project';
import { GetProjectRequest } from '../requests/ApiRequestHandler';
import { useMenuItemContext } from '../contexts/MenuItemContext';

const ProjectDetailsPage = () => {
    const {setSelectedItem} = useMenuItemContext();
    const {projectId} = useParams<{projectId: string}>();
    const [projectData, setProjectData] = useState<IProject>();

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
    }, [projectData])
    
    return (
    <div>
        <textarea defaultValue="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" className="text-2xl w-1/4 h-fit break-words"></textarea>
    </div>
  )
}

export default ProjectDetailsPage