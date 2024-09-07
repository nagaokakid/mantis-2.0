import { useMenuItemContext } from "../contexts/MenuItemContext"

const ProjectsPage = () => {
  const {selectedItem, setSelectedItem} = useMenuItemContext();

  setSelectedItem("projects");

  return (
    <div>ProjectsPage</div>
  )
}

export default ProjectsPage