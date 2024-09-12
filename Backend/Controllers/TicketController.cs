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

    public class TicketController : ControllerBase
    {
        private readonly TicketService _ticketService;
        private readonly UserTicketService _userTicketService;

        public TicketController(AppDbContext context)
        {
            _ticketService = new TicketService(context);
            _userTicketService = new UserTicketService(context);
        }

        // GET: api/ticket
        [HttpGet]
        public ActionResult<IQueryable<Ticket>> Get()
        {
            try
            {
                var tickets = _ticketService.GetAllTickets();
                return Ok(tickets);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // GET api/ticket/GUID
        [HttpGet("{id}")]
        public async Task<ActionResult<Ticket>> Get(string id)
        {
            try
            {
                var ticket = await _ticketService.GetTicket(id);
                if (ticket == null)
                {
                    return NotFound();
                }
                return Ok(ticket);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }

        // POST api/ticket
        [HttpPost]
        public async Task<ActionResult<Ticket>> Post([FromBody] CreateTicketInfo newTicketInfo)
        {
            try
            {
                // Ensure ticket, userId, and projectId are valid values
                if (newTicketInfo == null || 
                    string.IsNullOrWhiteSpace(newTicketInfo.UserId) || 
                    string.IsNullOrWhiteSpace(newTicketInfo.Ticket.ProjectId) ||
                    newTicketInfo.Ticket == null)
                {
                    return BadRequest("One or more are undefined: DTO, ticket, project ID, userId. Please check user context and api request in client-side code.");
                }

                var ticket = newTicketInfo.Ticket;
                ticket.Id = Guid.NewGuid().ToString();
                string userId = newTicketInfo.UserId;

                var newTicketFromDb = await _ticketService.CreateTicket(ticket);    // add ticket to db table
                await _userTicketService.AddUserTicket(userId, newTicketFromDb.Id); // add user id and ticket id to db table
                var ticketDto = new TicketDTO(newTicketFromDb);

                return CreatedAtAction(nameof(Post), ticketDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // PUT api/ticket/GUID
        [HttpPut("{id}")]
        public async Task<ActionResult<Ticket>> Put(string id, [FromBody] Ticket updatedTicket)
        {
            try
            {
                if (id != updatedTicket.Id)
                {
                    return BadRequest("ID provided in URL doesn't match the ID in the request body.");
                }
                var result = await _ticketService.UpdateTicket(updatedTicket);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // DELETE api/ticket/GUID
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> Delete(string id)
        {
            try
            {
                bool result = await _ticketService.DeleteTicket(id);
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
