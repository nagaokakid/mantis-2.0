using Microsoft.AspNetCore.Mvc;
using Backend.Data;
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
        public async Task<ActionResult> Post([FromBody] string email, [FromBody] string hashPass)
        {
            try
            {
                var user = await _userService.GetUserByEmail(email);
                if (user == null)
                {
                    return Unauthorized("Incorrect email");
                }
            
                var dbHashPass = user.Password;
                if (hashPass == dbHashPass)
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
