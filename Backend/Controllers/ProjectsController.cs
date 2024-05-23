using Microsoft.AspNetCore.Mvc;
using Backend.Data;
using Backend.Data.Model;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ProjectsController : ControllerBase
    {
        private Repository<Project> _repository;

        public ProjectsController(AppDbContext context)
        {
            _repository = new Repository<Project>(context);
        }

        // GET: api/projects
        [HttpGet]
        public async Task<ActionResult<IQueryable<Project>>> Get()
        {
            try
            {
                var projects = await _repository.GetAll();
                return Ok(projects);
            }
            catch (Exception ex) 
            {
                return StatusCode(500, ex.Message);
            }
        }

        // GET api/projects/GUID
        [HttpGet("{id}")]
        public async Task<ActionResult<Project>> Get(string id)
        {
            try
            {
                var project = await _repository.GetById(id);
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
        public async Task<ActionResult<Project>> Post(Project newProject)
        {
            try
            {
                var project = await _repository.Create(newProject);
                return CreatedAtAction(nameof(Post), project);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // PUT api/project/GUID
        [HttpPut("{id}")]
        public async Task<ActionResult<Project>> Put(string id, Project updatedProject)
        {
            try
            {
                if (id != updatedProject.Id)
                {
                    return BadRequest("ID provided in URL doesn't match the ID in the request body.");
                }
                var result = await _repository.Update(updatedProject);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // DELETE api/project/GUID --> continue here
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> Delete(string id)
        {
            try
            {
                bool result = await _repository.Delete(id);
                if (!result)
                {
                    return NotFound("Resource with given ID could not be found.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
