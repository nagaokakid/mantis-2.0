using Microsoft.AspNetCore.Mvc;
using Backend.Data;
using Backend.Data.Model;
using Backend.Services;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly UserService _userService;

        public RegisterController(AppDbContext context)
        {
            _userService = new UserService(context);
        }

        // POST api/register
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] User user)
        {
            try
            {
                if (UserExists(user.Email).Result)
                {
                    return BadRequest("Email is already registered as a user");
                }
                else
                {
                    user.Id = Guid.NewGuid().ToString();
                    await _userService.CreateUser(user);
                    return Created();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }

        // Verify if user already exists in database
        private async Task<bool> UserExists(string email)
        {
            var user = await _userService.GetUserByEmail(email);
            return user != null ? true : false;
        }
    }
}
