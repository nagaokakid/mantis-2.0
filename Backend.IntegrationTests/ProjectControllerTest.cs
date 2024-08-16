using Backend.Data.Model;
using Backend.Data;
using Backend.Controllers;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Mvc;

namespace Backend.IntegrationTests
{
    public class ProjectControllerTest
    {
        private Project _project;
        private AppDbContext _context;
        private ServiceProvider _serviceProvider;
/*        private DbContextOptions<AppDbContext> _options;*/
        private IConfiguration _configuration;
        private ProjectController _projectController;

        [SetUp]
        public void Setup()
        {
            _project = new Project()
            {
                Id = Guid.NewGuid().ToString(),
                Title = "test title",
                Description = "test description",
                StartDate = DateTime.Now,
                EndDate = null
            };

            var cloudSettings = new Dictionary<string, string>()
            {
                {
                    "ConnectionStrings:WebApiDatabase", 
                    "Host=pg-25c993b5-mantis.k.aivencloud.com; Port=13942; Database=testdb; Username=avnadmin; Password=AVNS_1prHxMHGaq47AcrU7us" 
                }
            };

            _configuration = new ConfigurationBuilder()
                .AddInMemoryCollection(cloudSettings)
                .Build();

            var serviceCollection = new ServiceCollection();
            serviceCollection.AddDbContext<AppDbContext>();

            _serviceProvider = serviceCollection.BuildServiceProvider();

            var scope = _serviceProvider.CreateScope();

            _context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            _context.Database.EnsureCreated();

            _projectController = new ProjectController(_context);

/*            _options = new DbContextOptionsBuilder<AppDbContext>()
                .UseNpgsql(_configuration.GetConnectionString("WebApiDatabase"))
                .Options;
*/
/*            _context = new AppDbContext(_configuration);*/
        }

        [TearDown]
        public void Teardown()
        {
            _context.Database.EnsureDeleted();
            _context.Dispose();
            _serviceProvider.Dispose();
        }

        [Test]
        public async Task CreateNewProjectReturns200Response()
        {
            var result = await _projectController.Post(_project);
            Assert.That(result, Is.TypeOf<CreatedAtActionResult>());
            Assert.That(result, Is.Not.Null);
        }
    }
}