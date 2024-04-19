using Backend.Data;
using Backend.Data.Model;

namespace Backend.Services
{
    public class UserService
    {
        private readonly Repository<User> _userRepo;

        public UserService(AppDbContext appDbContext) 
        {
            _userRepo = new Repository<User>(appDbContext);
        }

        public async Task<User> GetAllUsers(string id) 
        {
            return await _userRepo.GetById(id);
        }

        public async Task<User> GetUser(string id)
        {
            return await _userRepo.GetById(id);
        }

        public async Task<User> CreateUser(User newUser)
        {
            return await _userRepo.Create(newUser);
        }

        public async Task<User> UpdateUser(User updatedUser)
        {
            return await _userRepo.Update(updatedUser);
        }

        public async Task<bool> DeleteUser(string id)
        {
            return await _userRepo.Delete(id);
        }

    }
}
