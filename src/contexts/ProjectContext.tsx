import React from 'react'

const ProjectContext = () => {
    const getProjects = async() => {
        const response = await fetch("api/Projects");
        const projects = await response.json()
        console.log(projects);
    }

    getProjects()

  
  return (
    <div>ProjectContext</div>
  )
}

export default ProjectContext