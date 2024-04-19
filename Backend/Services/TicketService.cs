using Backend.Data;
using Backend.Data.Model;

namespace Backend.Services
{
    public class TicketService
    {
        private readonly Repository<Ticket> _ticketRepo;

        public TicketService(AppDbContext appDbContext)
        {
            _ticketRepo = new Repository<Ticket>(appDbContext);
        }

        public async Task<Ticket> GetAllTickets(string id)
        {
            return await _ticketRepo.GetById(id);
        }

        public async Task<Ticket> GetTicket(string id)
        {
            return await _ticketRepo.GetById(id);
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

