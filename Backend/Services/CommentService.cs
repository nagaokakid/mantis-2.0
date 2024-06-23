using Backend.Data;
using Backend.Data.Model;

namespace Backend.Services
{
    public class CommentService
    {
        private readonly Repository<Comments> _commentRepo;

        public CommentService(AppDbContext appDbContext)
        {
            _commentRepo = new Repository<Comments>(appDbContext);
        }

        public async Task<Comments> GetAllComments(string id)
        {
            return await _commentRepo.GetById(id);
        }

        public async Task<Comments> GetComment(string id)
        {
            return await _commentRepo.GetById(id);
        }

        public async Task<Comments> CreateComment(Comments newComment)
        {
            return await _commentRepo.Create(newComment);
        }

        public async Task<Comments> UpdateComment(Comments updatedComment)
        {
            return await _commentRepo.Update(updatedComment);
        }

        public async Task<bool> DeleteComment(string id)
        {
            return await _commentRepo.Delete(id);
        }

    }
}



