using Backend.Data;
using Backend.Data.Model;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class UserTicketService
    {
        private readonly Repository<UserTicket> _userTicketsRepo;

        public UserTicketService(AppDbContext appDbContext)
        {
            _userTicketsRepo = new Repository<UserTicket>(appDbContext);
        }

        // Retrieve all tickets belonging to a single user
        public async Task<List<Ticket>> GetAllUserTickets(string userId)
        {
            // Get all ticket objects for the specified userId
            var userTickets = await _userTicketsRepo
                .GetAll()
                .Where(entry => entry.UserId == userId)
                .Select(entry => entry.Ticket)
                .ToListAsync();

            return userTickets;
        }

        // Get number of tickets for a single user
        public int GetTicketCount(string userId)
        {
            var allTicketIds = _userTicketsRepo.GetAll();
            int count = allTicketIds.Where(entry => entry.UserId == userId).Count();
            return count;
        }

        public int GetCompletedTicketCount(string userId)
        {
            var allTicketIds = _userTicketsRepo.GetAll();
            var userTickets = allTicketIds.Where(entry => entry.UserId == userId);
            int userTicketsCompletedCount = userTickets.Where(entry => entry.Ticket.isCompleted == true).Count();
            return userTicketsCompletedCount;
        }

        public async Task AddUserTicket(string userId, string ticketId)
        {
            UserTicket userTicket = new()
            {
                UserId = userId,
                TicketId = ticketId
            };
            await _userTicketsRepo.Create(userTicket);
        }

    }
}


