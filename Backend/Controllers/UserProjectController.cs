using Backend.Data;
using Backend.Data.DTO;
using Backend.Data.Model;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProjectController : ControllerBase
    {
        private readonly UserProjectService _userProjectService;

        public UserProjectController(AppDbContext appDbContext)
        {
            _userProjectService = new UserProjectService(appDbContext);
        }

        // GET: api/userproject/userId
        [HttpGet("{userId}")]
        public async Task<ActionResult<List<ProjectDTO>>> Get(string userId)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(userId))
                {
                    return BadRequest("UserId is empty, null, or contains only whitespaces.");
                }
                var projectList = await _userProjectService.GetAllUserProjects(userId); // get all user projects from db
                var projectDTOs = projectList.Select(project => new ProjectDTO(project)).ToList(); // convert to project DTOs
                return Ok(projectDTOs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // POST api/<UserProjectController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<UserProjectController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<UserProjectController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
