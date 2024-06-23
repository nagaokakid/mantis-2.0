using Backend.Data;
using Backend.Data.Model;

namespace Backend.Services
{
    public class TicketService
    {
        private readonly Repository<Tickets> _ticketRepo;

        public TicketService(AppDbContext appDbContext)
        {
            _ticketRepo = new Repository<Tickets>(appDbContext);
        }

        public async Task<Tickets> GetAllTickets(string id)
        {
            return await _ticketRepo.GetById(id);
        }

        public async Task<Tickets> GetTicket(string id)
        {
            return await _ticketRepo.GetById(id);
        }

        public async Task<Tickets> CreateTicket(Tickets newTicket)
        {
            return await _ticketRepo.Create(newTicket);
        }

        public async Task<Tickets> UpdateTicket(Tickets updatedTicket)
        {
            return await _ticketRepo.Update(updatedTicket);
        }

        public async Task<bool> DeleteTicket(string id)
        {
            return await _ticketRepo.Delete(id);
        }

    }
}

