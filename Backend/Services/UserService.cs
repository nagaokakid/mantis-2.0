using Backend.Data;
using Backend.Data.Model;

namespace Backend.Services
{
    public class UserService
    {
        private readonly Repository<Users> _userRepo;
        private readonly Repository<UserProjects> _userProjectsRepo;
        private readonly Repository<UserTickets> _userTicketsRepo;
        private readonly Repository<Projects> _projectRepo;

        public UserService(AppDbContext appDbContext) 
        {
            _userRepo = new Repository<Users>(appDbContext);
            _userProjectsRepo = new Repository<UserProjects>(appDbContext);
            _projectRepo = new Repository<Projects>(appDbContext);
            _userTicketsRepo = new Repository<UserTickets>(appDbContext);
        }

        // Retrieve a single user
        public async Task<Users> GetUser(string id)
        {
            return await _userRepo.GetById(id);
        }

        // Retrieve all projects belonging to a single user
        public async Task<List<Projects>> GetAllUserProjects(string userId)
        {
            var userProjectsTable = await _userProjectsRepo.GetAll();
            var userProjectsFilteredList = userProjectsTable.Where(entry => entry.UserId == userId).ToList();
            List<Projects> projects = new List<Projects>();
            
            foreach (var listItem in userProjectsFilteredList)
            {
                var project = await _projectRepo.GetById(listItem.ProjectId);
                projects.Add(project);
            }

            return projects;
        }

        // Create a new user
        public async Task<Users> CreateUser(Users newUser)
        {
            return await _userRepo.Create(newUser);
        }

        // Update an existing user
        public async Task<Users> UpdateUser(Users updatedUser)
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
