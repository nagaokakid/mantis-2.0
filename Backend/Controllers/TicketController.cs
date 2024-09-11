using Microsoft.AspNetCore.Mvc;
using Backend.Data;
using Backend.Data.Model;
using Backend.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class TicketController : ControllerBase
    {
        private readonly TicketService _ticketService;

        public TicketController(AppDbContext context)
        {
            _ticketService = new TicketService(context);
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
        public async Task<ActionResult<Ticket>> Post([FromBody] Ticket newTicket)
        {
            try
            {
                newTicket.Id = Guid.NewGuid().ToString();
                /*newTicket.StartDate = newTicket.StartDate.ToUniversalTime();*/
                var ticket = await _ticketService.CreateTicket(newTicket);
                return CreatedAtAction(nameof(Post), ticket);
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
