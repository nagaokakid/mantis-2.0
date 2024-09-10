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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserProject>()
                .HasKey(up => new { up.UserId, up.ProjectId }); // Composite primary key
            modelBuilder.Entity<UserTicket>()
                .HasKey(up => new { up.UserId, up.TicketId }); // Composite primary key

            modelBuilder.Entity<UserProject>() // user for userproject
                .HasOne(up => up.User)
                .WithMany(u => u.UserProjects)
                .HasForeignKey(up => up.UserId)
                .OnDelete(DeleteBehavior.Cascade); // Set cascade delete

            modelBuilder.Entity<UserProject>() // project for userproject
                .HasOne(up => up.Project)
                .WithMany(p => p.UserProjects)
                .HasForeignKey(up => up.ProjectId)
                .OnDelete(DeleteBehavior.Cascade); // Set cascade delete

            modelBuilder.Entity<UserTicket>() // user for userticket
                .HasOne(up => up.User)
                .WithMany(t => t.UserTickets)
                .HasForeignKey(up => up.UserId)
                .OnDelete(DeleteBehavior.Cascade); // set cascade delete

            modelBuilder.Entity<UserTicket>() // ticket for userticket
                .HasOne(up => up.Ticket)
                .WithMany(t => t.UserTickets)
                .HasForeignKey(up => up.TicketId)
                .OnDelete(DeleteBehavior.Cascade); // set cascade delete
        }
    }
}
