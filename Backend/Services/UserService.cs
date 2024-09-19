using Backend.Data;
using Backend.Data.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class UserService
    {
        private readonly Repository<User> _userRepo;

        public UserService(AppDbContext appDbContext) 
        {
            _userRepo = new Repository<User>(appDbContext);
        }

        // Retrieve a single user by ID
        public async Task<User?> GetUserById(string id)
        {
            return await _userRepo.GetById(id);
        }

        // Retrieve a single user by username
        public async Task<User?> GetUserByEmail(string email)
        {
            var users = _userRepo.GetAll();
            return await users.FirstOrDefaultAsync(u => u.Email == email);
        }

        // Create a new user
        public async Task<User> CreateUser(User newUser)
        {
            return await _userRepo.Create(newUser);
        }

        // Update an existing user
        public async Task<User> UpdateUser(User updatedUser)
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
