import { useContext, useEffect, useState } from "react"
import {Modal, Button, Label, TextInput, Select} from "flowbite-react"
import { CreateTicketRequest, GetAllUserProjectsRequest } from "../../requests/ApiRequestHandler"
import { CreateTicketInfo, SuccessfulUserLoginInfo } from "../../data/DTO"
import { UserContext } from "../../contexts/UserContext"
import ITicket from "../../data/Ticket"
import IProject from "../../data/Project"

interface CreateTicketModalProps {
  onClose: () => void,
  displayToast: (message: string, duration: number) => void
  project: IProject | undefined,
  fromProjectPage: boolean
}

const getAllUserProjects: (userId: string) => Promise<IProject[]> = async (userId) => {
    const response = await GetAllUserProjectsRequest(userId);
    const projects: IProject[] = await response.json();
    return projects;
};

const CreateTicketModal: React.FC<CreateTicketModalProps> = ({onClose, displayToast, project, fromProjectPage}) => {

  const MAX_TITLE_LENGTH = 100;
  const MAX_DESC_LENGTH = 500;

  const userData = useContext(UserContext)?.user;
  const [isTitleValid, setIsTitleValid] = useState(true);
  const [projects, setProjects] = useState<IProject[]>([]);

  // default values for ticket
  const startTicket: ITicket = {
    id: "",
    projectId: project?.id,
    project: project,
    title: "",
    description: "",
    created: new Date(),
    startDate: null,
    endDate: null,
    status: "Open",
    priority: "Low",
    difficulty: "Easy",
    isCompleted: false
  }

  const [formData, setFormData] = useState<CreateTicketInfo>({
    UserId: userData?.id,
    Ticket: startTicket
  });

  const fetchAndSetProjects = async (userData: SuccessfulUserLoginInfo) => {
    const allProjects = await getAllUserProjects(userData.id);
    setProjects(allProjects);
  }

  useEffect(() => {
    if (!fromProjectPage && userData)
        {
          fetchAndSetProjects(userData);
        }
  }, [])

  const updateTicket = (prop: keyof ITicket, value: any) => {
    setFormData((prevData) => ({
      ...prevData, // keep user ID intact
      Ticket: {
        ...prevData.Ticket, // keep previous ticket details intact
      [prop]: value         // apply changes to respective property
      }
    }));
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsTitleValid(true);

    // user must enter a project title
    if (!formData.Ticket.title || formData.Ticket.title.trim().length === 0)
    {
      setIsTitleValid(false);
      return;
    }

    // set created date to current time
    formData.Ticket.created = new Date();

    // send create ticket request to server
    const response = await CreateTicketRequest(formData);

    // successful project creation
    if (response.ok)
    {
      displayToast("Ticket created successfully.", 10000);
      onClose();
    }
  }

  return (
    <>

      <Modal 
      onSubmit={handleSubmit} 
      show={true}
      size="md" 
      onClose={onClose} 
      popup={true}
      className="bg-opacity-30">

        <Modal.Header />

        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-grey-900 dark:text-white">Create a Ticket</h3>
            
            {/* Title */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="title" value="Title" />
              </div>
              <TextInput
                type="text"
                placeholder="Enter a title"
                value={formData.Ticket.title}
                onChange={(event) => updateTicket("title", event.target.value)}
                required={true}
                maxLength={MAX_TITLE_LENGTH}/>
                <div>
                  {!isTitleValid && <p className="text-xs ml-2 text-red-600">Please enter a title</p>}
                </div>
            </div>

            {/* Description */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="description" value="Description" />
              </div>
              <textarea rows={3} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder="Enter a description"
              value={formData.Ticket.description}
              onChange={(event) => updateTicket("description", event.target.value)}
              maxLength={MAX_DESC_LENGTH}>
              </textarea>
            </div>

            {/* Optional: Select a project */}
            {!fromProjectPage &&
                <div> 
                    <div className="mb-2 block">
                        <Label htmlFor="project" value="Project"/>
                    </div>
                    <Select>
                        {projects.slice().reverse().map((project) => (
                            <option title={project.title} value={project.id}>{project.title.substring(0,39)}</option>
                        ))}
                    </Select>
                </div>
            }

            {/* Status selection */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="status" value="Status"/>
              </div>
              <Select defaultValue="Open" onChange={(event) => updateTicket("status", event.target.value)}>
                <option value="Open">Open</option>
                <option value="Assigned">Assigned</option>
                <option value="In Progress">In Progress</option>
                <option value="On Hold">On Hold</option>
              </Select>
            </div>

            {/* Priority selection */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="priority" value="Priority"/>
              </div>
              <Select defaultValue="Low" onChange={(event) => updateTicket("priority", event.target.value)}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </Select>
            </div>

            {/* Difficulty selection */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="difficulty" value="Difficulty"/>
              </div>
              <Select defaultValue="Easy" onChange={(event) => updateTicket("difficulty", event.target.value)}>
                <option value="Easy">Easy</option>
                <option value="Moderate">Moderate</option>
                <option value="Hard">Hard</option>
                <option value="Very Hard">Very Hard</option>
              </Select>
            </div>

            {/* Submit/Close buttons */}
            <div className="flex flex-row pt-4">
              <Button type="submit" onClick={handleSubmit} className="bg-customGreen hover:bg-buttonHover">Confirm</Button>
              <Button onClick={onClose} className="ml-auto justify-end bg-gray-400 hover:bg-gray-500">Cancel</Button>
            </div>
            
            
          </div>
        </Modal.Body>

      </Modal>
    </>
  );
}

export default CreateTicketModal