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

        public LoginController(AppDbContext context)
        {
            _userService = new UserService(context);
        }

        // POST api/login/
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] UserLoginInfo userLoginInfo)
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
                    return Unauthorized("Incorrect email");
                }
            
                var hashPass = user.Password;
                if (hashPass == userLoginInfo.Password)
                {
                    return Ok();
                }
                else
                {
                    return Unauthorized("Incorrect password");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }


        }
    }
}
