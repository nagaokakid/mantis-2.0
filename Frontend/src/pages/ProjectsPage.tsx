import { useMenuItemContext } from "../contexts/MenuItemContext"

const ProjectsPage = () => {
  const {setSelectedItem} = useMenuItemContext();

  setSelectedItem("projects");

  return (
    <div>

    </div>
  )
}

export default ProjectsPage