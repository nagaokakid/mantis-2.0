import React from 'react'

const port = 80;
const url = "https://mantis-2-0-backend.onrender.com/api/projects";

const ProjectContext = () => {

    async function getProjects() {
      const response = await fetch(url, {
        headers: {
          "Content-Type":"application/json",
          "Access-Control-Allow-Origin":"*"
        }
      });
      const data = await response.json();
      console.log(data);
    }
  
  return (
    <div>
      <div>ProjectContext</div>
      <button className="size-20 bg-red-700" onClick={getProjects}></button>
    </div>
  )
}

export default ProjectContext