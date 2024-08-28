using Microsoft.AspNetCore.Mvc;
using Backend.Data;
using Backend.Data.Model;
using Backend.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ProjectsController : ControllerBase
    {
        private ProjectService _projectService;

        public ProjectsController(AppDbContext context)
        {
            _projectService = new ProjectService(context);
        }

        // GET: api/projects
        [HttpGet]
        public async Task<ActionResult<IQueryable<Projects>>> Get()
        {
            try
            {
                var projects = await _projectService.GetAllProjects();
                return Ok(projects);
            }
            catch (Exception ex) 
            {
                return StatusCode(500, ex.Message);
            }
        }

        // GET api/projects/GUID
        [HttpGet("{id}")]
        public async Task<ActionResult<Projects>> Get(string id)
        {
            try
            {
                var project = await _projectService.GetProject(id);
                if (project == null)
                {
                    return NotFound();
                }
                return Ok(project);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }

        // POST api/project
        [HttpPost]
        public async Task<ActionResult<Projects>> Post(Projects newProject)
        {
            try
            {
                var project = await _projectService.CreateProject(newProject);
                return CreatedAtAction(nameof(Post), project);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // PUT api/project/GUID
        [HttpPut("{id}")]
        public async Task<ActionResult<Projects>> Put(string id, Projects updatedProject)
        {
            try
            {
                if (id != updatedProject.Id)
                {
                    return BadRequest("ID provided in URL doesn't match the ID in the request body.");
                }
                var result = await _projectService.UpdateProject(updatedProject);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // DELETE api/project/GUID
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> Delete(string id)
        {
            try
            {
                bool result = await _projectService.DeleteProject(id);
                if (!result)
                {
                    return NotFound("Project with given ID could not be found.");
                }
                return result;
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
