using Backend.Data;
using Backend.Data.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class UserService
    {
        private readonly Repository<User> _userRepo;
        private readonly Repository<UserProject> _userProjectsRepo;
        private readonly Repository<UserTicket> _userTicketsRepo;
        private readonly Repository<Project> _projectRepo;
        private readonly Repository<Ticket> _ticketRepo;
        private readonly Repository<Comment> _commentRepo;

        public UserService(AppDbContext appDbContext) 
        {
            _userRepo = new Repository<User>(appDbContext);
            _userProjectsRepo = new Repository<UserProject>(appDbContext);
            _projectRepo = new Repository<Project>(appDbContext);
            _ticketRepo = new Repository<Ticket>(appDbContext);
            _userTicketsRepo = new Repository<UserTicket>(appDbContext);
            _commentRepo = new Repository<Comment>(appDbContext);
        }

        // Retrieve a single user by ID
        public async Task<User?> GetUserById(string id)
        {
            return await _userRepo.GetById(id);
        }

        // Retrieve a single user by username
        public async Task<User?> GetUserByEmail(string email)
        {
            var users = _userRepo.GetAll();
            return await users.FirstOrDefaultAsync(u => u.Email == email);
        }

        // Retrieve all projects belonging to a single user
        public async Task<List<Project>> GetAllUserProjects(string userId)
        {
            var userProjectsTable = _userProjectsRepo.GetAll();
            var userProjectIds = userProjectsTable.Where(entry => entry.UserId == userId).ToList();
            List<Project> projects = new List<Project>();
            
            foreach (var listItem in userProjectIds)
            {
                var project = await _projectRepo.GetById(listItem.ProjectId);
                if (project != null) { projects.Add(project); }
            }

            return projects;
        }

        // Retrieve all tickets belonging to a single user
        public async Task<List<Ticket>> GetAllUserTickets(string userId)
        {
            var userTicketsTable = _userTicketsRepo.GetAll();
            var userTicketIds = userTicketsTable.Where(entry => entry.UserId == userId).ToList();
            List<Ticket> tickets = new List<Ticket>();

            foreach (var listItem in userTicketIds)
            {
                var ticket = await _ticketRepo.GetById(listItem.TicketId);
                if (ticket != null) { tickets.Add(ticket); }
            }

            return tickets;
        }

        // Retrieve all comments belonging to a single user
        public List<Comment> GetAllUserComments(string userId)
        {
            var commentTable = _commentRepo.GetAll();
            var userComments = commentTable.Where(entry => entry.UserId == userId).ToList();
            return userComments;
        }

        // Get number of projects for a single user
        public int GetProjectCount(string userId)
        {
            var allProjectIds = _userProjectsRepo.GetAll();
            int count = allProjectIds.Where(entry => entry.UserId == userId).Count();
            return count;
        }

        // Get number of tickets for a single user
        public int GetTicketCount(string userId)
        {
            var allTicketIds = _userTicketsRepo.GetAll();
            int count = allTicketIds.Where(entry => entry.UserId == userId).Count();
            return count;
        }

        // Create a new user
        public async Task<User> CreateUser(User newUser)
        {
            return await _userRepo.Create(newUser);
        }

        // Update an existing user
        public async Task<User> UpdateUser(User updatedUser)
        {
            return await _userRepo.Update(updatedUser);
        }

        // Delete an existing user
        public async Task<bool> DeleteUser(string id)
        {
            return await _userRepo.Delete(id);
        }

    }
}
