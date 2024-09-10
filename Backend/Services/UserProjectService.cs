using Backend.Data;
using Backend.Data.Model;

namespace Backend.Services
{
    public class UserProjectService
    {
        private readonly Repository<UserProject> _userProjectRepo;

        public UserProjectService(AppDbContext appDbContext)
        {
            _userProjectRepo = new Repository<UserProject>(appDbContext);
        }

        public async Task AddUserProject(string userId, string projectId)
        {
            UserProject userProject = new UserProject
            {
                UserId = userId,
                ProjectId = projectId
            }; 
        }

    }
}


