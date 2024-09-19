using Backend.Data;
using Backend.Data.Model;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class UserProjectService
    {
        private readonly Repository<UserProject> _userProjectsRepo;

        public UserProjectService(AppDbContext appDbContext)
        {
            _userProjectsRepo = new Repository<UserProject>(appDbContext);
        }

        // Retrieve all projects belonging to a single user
        public async Task<List<Project>> GetAllUserProjects(string userId)
        {
            // Get all project objects for the specified userId
            var userProjects = await _userProjectsRepo
                .GetAll()
                .Where(entry => entry.UserId == userId)
                .Select(entry => entry.Project)
                .ToListAsync();

            return userProjects;
        }

        // Get number of projects for a single user
        public int GetProjectCount(string userId)
        {
            var allProjectIds = _userProjectsRepo.GetAll();
            int count = allProjectIds.Where(entry => entry.UserId == userId).Count();
            return count;
        }

        public int GetCompletedProjectCount(string userId)
        {
            var allProjectIds = _userProjectsRepo.GetAll();
            var userProjects = allProjectIds.Where(entry => entry.UserId == userId);
            int userProjectsCompletedCount = userProjects.Where(entry => entry.Project.isCompleted == true).Count();
            return userProjectsCompletedCount;
        }

        public async Task AddUserProject(string userId, string projectId)
        {
            UserProject userProject = new()
            {
                UserId = userId,
                ProjectId = projectId
            };
            await _userProjectsRepo.Create(userProject);
        }


    }
}


