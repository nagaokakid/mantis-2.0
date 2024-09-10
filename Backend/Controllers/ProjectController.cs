using Microsoft.AspNetCore.Mvc;
using Backend.Data;
using Backend.Data.Model;
using Backend.Data.DTO;
using Backend.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class ProjectController : ControllerBase
    {
        private readonly ProjectService _projectService;
        private readonly UserService _userService;
        private readonly UserProjectService _userProjectService;

        public ProjectController(AppDbContext context)
        {
            _projectService = new ProjectService(context);
            _userService = new UserService(context);
            _userProjectService = new UserProjectService(context);
        }

        // GET: api/project
        [HttpGet]
        public ActionResult<IQueryable<Project>> Get()
        {
            try
            {
                var projects = _projectService.GetAllProjects();
                return Ok(projects);
            }
            catch (Exception ex) 
            {
                return StatusCode(500, ex.Message);
            }
        }

        // GET api/project/GUID
        [HttpGet("{id}")]
        public async Task<ActionResult<Project>> Get(string id)
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
        public async Task<ActionResult<Project>> Post([FromBody] CreateProjectInfo newProjectInfo)
        {
            try
            {
                var newProject = newProjectInfo.Project;
                string userId = newProjectInfo.UserId;
                
                if (newProject == null || userId == null)
                {
                    return BadRequest("Project and/or userId are undefined. Please check user context in client-side code.");
                }

                string projectId = Guid.NewGuid().ToString();

                newProject.Id = projectId;
                newProject.StartDate = newProject.StartDate.ToUniversalTime();
                var project = await _projectService.CreateProject(newProject);  // add to project table
                var projectDto = new ProjectDTO(project);
                await _userProjectService.AddUserProject(userId, projectId); // add to user project table

                return CreatedAtAction(nameof(Post), projectDto);  // send DTO back to client
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // PUT api/project/GUID
        [HttpPut("{id}")]
        public async Task<ActionResult<Project>> Put(string id, [FromBody] Project updatedProject)
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
                    return NotFound("Resource with given ID could not be found.");
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
