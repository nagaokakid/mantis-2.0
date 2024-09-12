import { useContext, useState } from "react"
import {Modal, Button, Label, TextInput, Select} from "flowbite-react"
import IProject from "../../data/Project"
import { CreateProjectRequest } from "../../requests/ApiRequestHandler"
import { CreateProjectInfo } from "../../data/DTO"
import { UserContext } from "../../contexts/UserContext"

interface CreateProjectModalProps {
  onClose: () => void, // Define the onClose prop as a function
  displayToast: (message: string, duration: number) => void
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({onClose, displayToast}) => {

  const MAX_TITLE_LENGTH = 100;
  const MAX_DESC_LENGTH = 500;

  const userData = useContext(UserContext)?.user; 

  const startProject: IProject = {
    id: "",
    title: "",
    description: "",
    created: new Date(),
    startDate: null,
    endDate: null,
    status: "New",
    isCompleted: false
  }

  const [formData, setFormData] = useState<CreateProjectInfo>({
    UserId: userData?.id,
    Project: startProject
  });

  const [isTitleValid, setIsTitleValid] = useState(true);

  const updateProject = (prop: keyof IProject, value: any) => {
    setFormData((prevData) => ({
      ...prevData, // keep user ID intact
      Project: {
        ...prevData.Project, // keep previous project details intact
      [prop]: value         // apply changes to respective property
      }
    }));
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsTitleValid(true);

    // user must enter a project title
    if (!formData.Project.title || formData.Project.title.trim().length === 0)
    {
      setIsTitleValid(false);
      return;
    }

    // set created date to current time
    formData.Project.created = new Date();

    // gather project info
    const response = await CreateProjectRequest(formData);

    // successful project creation
    if (response.ok)
    {
      displayToast("Project created successfully.", 10000);
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
            <h3 className="text-xl font-semibold text-grey-900 dark:text-white">Create a Project</h3>
            
            <div>
              
              <div className="mb-2 block">
                <Label htmlFor="title" value="Title" />
              </div>
              <TextInput
                type="text"
                placeholder="Enter a title"
                value={formData.Project.title}
                onChange={(event) => updateProject("title", event.target.value)}
                required
                maxLength={MAX_TITLE_LENGTH}/>
                <div>
                  {!isTitleValid && <p className="text-xs ml-2 text-red-600">Please enter a title</p>}
                </div>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="description" value="Description" />
              </div>
              <textarea rows={3} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder="Enter a description"
              value={formData.Project.description}
              onChange={(event) => updateProject("description", event.target.value)}
              maxLength={MAX_DESC_LENGTH}>
              </textarea>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="status" value="Status"/>
              </div>
              <Select defaultValue="New" onChange={(event) => updateProject("status", event.target.value)}>
                <option value="New">New</option>
                <option value="In Progress">In Progress</option>
                <option value="On Hold">On Hold</option>
                <option value="Pending Review">Pending Review</option>
                <option value="Reopened">Reopened</option>
              </Select>
            </div>
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

export default CreateProjectModal