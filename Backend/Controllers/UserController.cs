using Backend.Data;
using Backend.Data.DTO;
using Backend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;
        private readonly UserTicketService _userTicketService;
        private readonly UserProjectService _userProjectService;

        public UserController(AppDbContext appDbContext)
        {
            _userService = new UserService(appDbContext);
            _userTicketService = new UserTicketService(appDbContext);
            _userProjectService = new UserProjectService(appDbContext);
        }

        // GET api/user/basic/GUID
        [HttpGet("basic/{userId}")]
        public async Task<ActionResult<UserBasicInfo>> Get(string userId)
        {
            try
            {
                var user = await _userService.GetUserById(userId);

                if (user == null)
                {
                    return BadRequest("User ID is invalid. User doesn't exist.");
                }

                int userProjectCount = _userProjectService.GetProjectCount(userId);
                int userTicketCount = _userTicketService.GetTicketCount(userId);
                int userProjectCompletedCount = _userProjectService.GetCompletedProjectCount(userId);
                int userTicketCompletedCount = _userTicketService.GetCompletedTicketCount(userId);
                var userBasicInfo = new UserBasicInfo()
                {
                    Id = user.Id,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    UserName = user.UserName,
                    ProjectCount = userProjectCount,
                    TicketCount = userTicketCount,
                    CompletedProjectCount = userProjectCompletedCount,
                    CompletedTicketCount = userTicketCompletedCount
                };

                return Ok(userBasicInfo);

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

    }
}
