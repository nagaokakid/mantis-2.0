using Backend.Data;
using Backend.Data.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Moq;
using NUnit.Framework;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.UnitTests
{
    public class RepositoryTests
    {
        /*        private AppDbContext _context;
                private Repository<UserProjects> _repo;*/

        private Mock<AppDbContext> _mockContext;
        private Repository<UserProject> _repo;

        private Mock<AppDbContext> CreateMockDbContext()
        {
            // Create in-memory options for DbContext
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDatabase")
                .Options;

            // Initialize the DbContext with in-memory options
            var context = new AppDbContext(options);

            // Create mock AppDbContext
            var mockContext = new Mock<AppDbContext>(options);

            // Setup the DbSets to use in-memory data
            mockContext.Setup(m => m.Projects).Returns(context.Projects);
            mockContext.Setup(m => m.Tickets).Returns(context.Tickets);
            mockContext.Setup(m => m.Users).Returns(context.Users);
            mockContext.Setup(m => m.Comments).Returns(context.Comments);
            mockContext.Setup(m => m.UserProjects).Returns(context.UserProjects);
            mockContext.Setup(m => m.UserTickets).Returns(context.UserTickets);

            return mockContext;
        }

        [SetUp]
        public void Setup()
        {
            _mockContext = CreateMockDbContext();
            _repo = new Repository<UserProject>(_mockContext.Object);
        }

        [Test]
        public async Task GetAll_ReturnsAllEntities()
        {
            List<UserProject> data = new List<UserProject>()
            {
                new UserProject {Id = "1", UserId = "1", ProjectId = "1"},
                new UserProject {Id = "2", UserId = "2", ProjectId = "2"},
                new UserProject {Id = "3", UserId = "3", ProjectId = "3"}
            };

            _mockContext.Object.UserProjects.AddRange(data);
            var result = _repo.GetAll();

            Assert.That(result.Result.Count(), Is.EqualTo(3));
        }

/*        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDatabase")
                .Options;
            _context = new AppDbContext(options);
            _context.Set<UserProjects>();
            _repo = new Repository<UserProjects>(_context);
        }

        [Test]
        public async Task GetAll_ReturnsAllEntities()
        {
            List<UserProjects> data = new List<UserProjects>()
            {
                new UserProjects {Id = "1", UserId = "1", ProjectId = "1"},
                new UserProjects {Id = "2", UserId = "2", ProjectId = "2"},
                new UserProjects {Id = "3", UserId = "3", ProjectId = "3"}
            };

            _context.UserProjects.AddRange(data);
            await _context.SaveChangesAsync();
            var result = _repo.GetAll();

            Assert.That(result.Result.Count(), Is.EqualTo(3));
        }*/
    }
}