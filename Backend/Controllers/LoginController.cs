using Microsoft.AspNetCore.Mvc;
using Backend.Data;
using Backend.Data.DTO;
using Backend.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class LoginController : ControllerBase
    {
        private readonly UserService _userService;
        private readonly UserProjectService _userProjectService;
        private readonly UserTicketService _userTicketService;

        public LoginController(AppDbContext context)
        {
            _userService = new UserService(context);
            _userProjectService = new UserProjectService(context);
            _userTicketService = new UserTicketService(context);
        }

        // POST api/login/
        [HttpPost]
        public async Task<ActionResult<SuccessfulUserLoginInfo>> Post([FromBody] UserLoginInfo userLoginInfo)
        {
            try
            {
                if (userLoginInfo == null || string.IsNullOrWhiteSpace(userLoginInfo.Email) || 
                    string.IsNullOrWhiteSpace(userLoginInfo.Password))
                {
                    return BadRequest("Invalid input data. Please review client-side code to ensure DTO properties are correctly formatted.");
                }

                var user = await _userService.GetUserByEmail(userLoginInfo.Email);
                if (user == null)
                {
                    return Unauthorized();
                }
            
                var hashPass = user.Password;
                if (hashPass == userLoginInfo.Password)
                {
                    int projectCount = _userProjectService.GetProjectCount(user.Id);
                    int ticketCount = _userTicketService.GetTicketCount(user.Id);
                    int projectsCompletedCount = _userProjectService.GetCompletedProjectCount(user.Id);
                    int ticketsCompletedCount = _userTicketService.GetCompletedTicketCount(user.Id);
                    var successfulUserLoginInfo = new SuccessfulUserLoginInfo()
                    {
                        Id = user.Id,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        UserName = user.UserName,
                        ProjectCount = projectCount,
                        TicketCount = ticketCount,
                        CompletedProjectCount = projectsCompletedCount,
                        CompletedTicketCount = ticketsCompletedCount
                    };
                    return Ok(successfulUserLoginInfo);
                }
                else
                {
                    return Unauthorized();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }


        }
    }
}
