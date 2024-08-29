using Microsoft.AspNetCore.Mvc;
using Backend.Data;
using Backend.Data.Model;
using Backend.Data.DTO;
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
        public async Task<ActionResult> Post([FromBody] UserRegisterInfo userRegisterInfo)
        {
            try
            {
                if (UserExists(userRegisterInfo.Email).Result)
                {
                    return BadRequest("Email is already registered as a user");
                }
                else
                {
                    var randomNum = new Random().Next(1000, 10000);
                    User newUser = new User()
                    {
                        Id = Guid.NewGuid().ToString(),
                        FirstName = userRegisterInfo.FirstName,
                        LastName = userRegisterInfo.LastName,
                        Email = userRegisterInfo.Email,
                        Password = userRegisterInfo.Password,
                        UserName = userRegisterInfo.FirstName[0] + userRegisterInfo.LastName[0] + "#" + randomNum.ToString(),
                        EmailConfirmed = false
                    };
                    await _userService.CreateUser(newUser);
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
