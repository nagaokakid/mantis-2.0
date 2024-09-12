using Backend.Data;
using Backend.Data.Model;

namespace Backend.Services
{
    public class UserTicketService
    {
        private readonly Repository<UserTicket> _userTicketsRepo;

        public UserTicketService(AppDbContext appDbContext)
        {
            _userTicketsRepo = new Repository<UserTicket>(appDbContext);
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


