using Npgsql;
using Backend.Exceptions;
using Backend.Data.Model;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        private readonly AppDbContext _appDbContext;
        
        public Repository(AppDbContext context) 
        {
            _appDbContext = context;
        }
       
        public IQueryable<TEntity> GetAll()
        {
            try
            {
                return _appDbContext.Set<TEntity>().AsQueryable();
            }
            catch (NpgsqlException ex)
            {
                string msg = "Failed to retrieve all database records for a table.";
                throw new DatabaseException(msg, ex);
            }
            
        }

        public async Task<TEntity?> GetById(string id)
        {
            try
            {
                return await _appDbContext.FindAsync<TEntity>(id);
            }
            catch (NpgsqlException ex)
            {
                string msg = "Failed to retrieve a database record with given ID.";
                throw new DatabaseException(msg, ex);
            }
            
        }

        public async Task<TEntity> Create(TEntity entity)
        {
            try
            {
                var entityEntry = await _appDbContext.AddAsync<TEntity>(entity);
                await _appDbContext.SaveChangesAsync();
                return entityEntry.Entity;
            }
            catch (NpgsqlException ex)
            {
                string msg = "Failed to create a new database record.";
                throw new DatabaseException(msg, ex);
            }

        }

        public async Task<TEntity> Update(TEntity entity)
        {
            try
            {
                var entityEntry = _appDbContext.Update<TEntity>(entity);
                await _appDbContext.SaveChangesAsync();
                return entityEntry.Entity;
            }
            catch (NpgsqlException ex)
            {
                string msg = "Failed to update an existing database record.";
                throw new DatabaseException(msg, ex);
            }

        }

        public async Task<bool> Delete(string id)
        {
            try
            {
                var entity = await _appDbContext.FindAsync<TEntity>(id);

                if (entity != null)
                {
                    _appDbContext.Remove<TEntity>(entity);
                    await _appDbContext.SaveChangesAsync();
                    return true;    // delete operation successful
                }

                return false;   // delete operation failed
            }
            catch (NpgsqlException ex)
            {
                string msg = "Failed to delete an existing database record with given ID.";
                throw new DatabaseException(msg, ex);
            }
        }
        
    }
}
