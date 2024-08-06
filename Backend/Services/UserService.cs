using Backend.Data;
using Backend.Data.Model;

namespace Backend.Services
{
    public class UserService
    {
        private readonly Repository<User> _userRepo;
        private readonly Repository<UserProject> _userProjectsRepo;
        private readonly Repository<UserTicket> _userTicketsRepo;
        private readonly Repository<Project> _projectRepo;

        public UserService(AppDbContext appDbContext) 
        {
            _userRepo = new Repository<User>(appDbContext);
            _userProjectsRepo = new Repository<UserProject>(appDbContext);
            _projectRepo = new Repository<Project>(appDbContext);
            _userTicketsRepo = new Repository<UserTicket>(appDbContext);
        }

        // Retrieve a single user
        public async Task<User> GetUser(string id)
        {
            return await _userRepo.GetById(id);
        }

        // Retrieve all projects belonging to a single user
        public async Task<List<Project>> GetAllUserProjects(string userId)
        {
            var userProjectsTable = await _userProjectsRepo.GetAll();
            var userProjectsFilteredList = userProjectsTable.Where(entry => entry.UserId == userId).ToList();
            List<Project> projects = new List<Project>();
            
            foreach (var listItem in userProjectsFilteredList)
            {
                var project = await _projectRepo.GetById(listItem.ProjectId);
                projects.Add(project);
            }

            return projects;
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
