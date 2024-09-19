using Backend.Data;
using Backend.Data.DTO;
using Backend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserTicketController : ControllerBase
    {
        private readonly UserTicketService _userTicketService;

        public UserTicketController(AppDbContext appDbContext)
        {
            _userTicketService = new UserTicketService(appDbContext);
        }

        // GET: api/userticket/userId
        [HttpGet("{userId}")]
        public async Task<ActionResult<List<TicketDTO>>> Get(string userId)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(userId))
                {
                    return BadRequest("UserId is empty, null, or contains only whitespaces.");
                }
                var ticketList = await _userTicketService.GetAllUserTickets(userId); // get all user tickets from db
                var ticketDTOs = ticketList.Select(ticket => new TicketDTO(ticket)).ToList(); // convert to ticket DTOs
                return Ok(ticketDTOs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
