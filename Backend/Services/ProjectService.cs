using Backend.Data;
using Backend.Data.Model;

namespace Backend.Services
{
    public class ProjectService
    {
        private readonly Repository<Projects> _projectRepo;

        public ProjectService(AppDbContext appDbContext)
        {
            _projectRepo = new Repository<Projects>(appDbContext);
        }

        public async Task<Projects> GetAllProjects(string id)
        {
            return await _projectRepo.GetById(id);
        }

        public async Task<Projects> GetProjects(string id)
        {
            return await _projectRepo.GetById(id);
        }

        public async Task<Projects> CreateProject(Projects newProject)
        {
            return await _projectRepo.Create(newProject);
        }

        public async Task<Projects> UpdateProject(Projects updatedProject)
        {
            return await _projectRepo.Update(updatedProject);
        }

        public async Task<bool> DeleteProject(string id)
        {
            return await _projectRepo.Delete(id);
        }

    }
}


