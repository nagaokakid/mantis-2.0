using Backend.Data;
using Backend.Data.Model;

namespace Backend.Services
{
    public class ProjectService
    {
        private readonly Repository<Project> _projectRepo;

        public ProjectService(AppDbContext appDbContext)
        {
            _projectRepo = new Repository<Project>(appDbContext);
        }

        public async Task<IQueryable<Project>> GetAllProjects()
        {
            return await _projectRepo.GetAll();
        }

        public async Task<Project> GetProject(string id)
        {
            return await _projectRepo.GetById(id);
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


