import { useMenuItemContext } from "../contexts/MenuItemContext"

const ProjectsPage = () => {
  const {setSelectedItem} = useMenuItemContext();

  setSelectedItem("projects");

  return (
    <div>ProjectsPage</div>
  )
}

export default ProjectsPage