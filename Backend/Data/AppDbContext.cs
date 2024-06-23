using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Backend.Data.Model;

namespace Backend.Data
{
    public class AppDbContext : DbContext
    {
        protected readonly IConfiguration configuration;

        public AppDbContext(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(configuration.GetConnectionString("WebApiDatabase"));
        }

        public DbSet<Projects> Projects { get; set; }
        public DbSet<Tickets> Tickets { get; set; }
        public DbSet<Users> Users { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<UserProjects> UserProjects { get; set; }
        public DbSet<UserTickets> UserTickets { get; set; }
    }
}
