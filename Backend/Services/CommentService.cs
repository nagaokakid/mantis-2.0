using Backend.Data;
using Backend.Data.Model;

namespace Backend.Services
{
    public class CommentService
    {
        private readonly Repository<Comment> _commentRepo;

        public CommentService(AppDbContext appDbContext)
        {
            _commentRepo = new Repository<Comment>(appDbContext);
        }

        public async Task<Comment> GetAllComments(string id)
        {
            return await _commentRepo.GetById(id);
        }

        public async Task<Comment> GetComment(string id)
        {
            return await _commentRepo.GetById(id);
        }

        public async Task<Comment> CreateComment(Comment newComment)
        {
            return await _commentRepo.Create(newComment);
        }

        public async Task<Comment> UpdateComment(Comment updatedComment)
        {
            return await _commentRepo.Update(updatedComment);
        }

        public async Task<bool> DeleteComment(string id)
        {
            return await _commentRepo.Delete(id);
        }

    }
}



