using Backend.Data;
using Backend.Data.Model;

namespace Backend.Services
{
    public class TicketService
    {
        private readonly Repository<Ticket> _ticketRepo;
        private readonly Repository<Comment> _commentRepo;

        public TicketService(AppDbContext appDbContext)
        {
            _ticketRepo = new Repository<Ticket>(appDbContext);
            _commentRepo = new Repository<Comment>(appDbContext);
        }

        public IQueryable<Ticket> GetAllTickets()
        {
            return _ticketRepo.GetAll();
        }

        public async Task<Ticket?> GetTicket(string id)
        {
            return await _ticketRepo.GetById(id);
        }

        public List<Comment> GetAllTicketComments(string ticketId)
        {
            var commentTable = _commentRepo.GetAll();
            var ticketComments = commentTable.Where(entry => entry.TicketId == ticketId).ToList();
            return ticketComments;
        }

        public async Task<Ticket> CreateTicket(Ticket newTicket)
        {
            return await _ticketRepo.Create(newTicket);
        }

        public async Task<Ticket> UpdateTicket(Ticket updatedTicket)
        {
            return await _ticketRepo.Update(updatedTicket);
        }

        public async Task<bool> DeleteTicket(string id)
        {
            return await _ticketRepo.Delete(id);
        }

    }
}

