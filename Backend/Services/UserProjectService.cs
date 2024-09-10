using Backend.Data;
using Backend.Data.Model;

namespace Backend.Services
{
    public class UserProjectService
    {
        private readonly Repository<UserProject> _userProjectsRepo;

        public UserProjectService(AppDbContext appDbContext)
        {
            _userProjectsRepo = new Repository<UserProject>(appDbContext);
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


