using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Backend.Data.Model;

namespace Backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options): base(options) { }

        // protected readonly IConfiguration configuration;

/*        public AppDbContext(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
*/
/*        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(configuration.GetConnectionString("WebApiDatabase"));
        }*/

        public DbSet<Project> Projects { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<UserProject> UserProjects { get; set; }
        public DbSet<UserTicket> UserTickets { get; set; }
    }
}
