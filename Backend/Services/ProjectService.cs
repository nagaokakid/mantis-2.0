using Backend.Data;
using Backend.Data.Model;

namespace Backend.Services
{
    public class ProjectService
    {
        private readonly Repository<Project> _projectRepo;
        private readonly Repository<Ticket> _ticketRepo;
        private readonly Repository<UserProject> _userProjectRepo;
        private readonly Repository<User> _userRepo;

        public ProjectService(AppDbContext appDbContext)
        {
            _projectRepo = new Repository<Project>(appDbContext);
            _ticketRepo = new Repository<Ticket>(appDbContext);
            _userProjectRepo = new Repository<UserProject>(appDbContext);
            _userRepo = new Repository<User>(appDbContext);
        }

        public IQueryable<Project> GetAllProjects()
        {
            return _projectRepo.GetAll();
        }

        public async Task<Project?> GetProject(string id)
        {
            return await _projectRepo.GetById(id);
        }

        public List<Ticket> GetAllProjectTickets(string projectId)
        {
            var ticketTable = _ticketRepo.GetAll();
            var projectTickets = ticketTable.Where(entry => entry.ProjectId == projectId).ToList();
            return projectTickets;
        }

        public async Task<List<User>> GetAllProjectUsers(string projectId)
        {
            var userProjectsTable = _userProjectRepo.GetAll();
            var userIds = userProjectsTable.Where(entry => entry.ProjectId == projectId).ToList();
            List<User> users = new List<User>();

            foreach(var listItem in userIds)
            {
                var user = await _userRepo.GetById(listItem.UserId);
                if (user != null) { users.Add(user); }
            }

            return users;
        }

        public async Task<Project> CreateProject(Project newProject)
        {
            return await _projectRepo.Create(newProject);
        }

        public async Task<Project> UpdateProject(Project updatedProject)
        {
            return await _projectRepo.Update(updatedProject);
        }

        public async Task<bool> DeleteProject(string id)
        {
            return await _projectRepo.Delete(id);
        }

    }
}


