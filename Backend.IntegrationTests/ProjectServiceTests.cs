﻿using Backend.Services;
using Backend.Data;
using Backend.Data.Model;
using Xunit;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Azure;
using Microsoft.Extensions.DependencyInjection;

namespace Backend.IntegrationTests
{
    public class ProjectServiceTests : IDisposable
    {
        private readonly IServiceProvider _serviceProvider;

/*        private readonly ProjectService _projectService;
        private readonly AppDbContext _appDbContext;
        private readonly IConfiguration _configuration;
        private readonly DbContextOptions _dbContextOptions;*/
        private readonly Project _project1;
        private readonly Project _project2;

        public ProjectServiceTests()
        {
            var configuration = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json")
            .Build();
            
/*            var dbContextOptions = new DbContextOptionsBuilder<AppDbContext>()
                .UseNpgsql(configuration.GetConnectionString("WebApiDatabase")).Options;*/

            var serviceCollection = new ServiceCollection();

            serviceCollection.AddDbContext<AppDbContext>(options => 
                options.UseNpgsql(configuration.GetConnectionString("TestDatabase")), 
                ServiceLifetime.Scoped);

            serviceCollection.AddScoped<ProjectService>();

            _serviceProvider = serviceCollection.BuildServiceProvider();

/*            _appDbContext = new AppDbContext(_dbContextOptions);

            _projectService = new ProjectService(_appDbContext);*/

            _project1 = CreateProjectObject();
            _project2 = CreateProjectObject();

            using (var scope = _serviceProvider.CreateScope())
            {
                var projectService = scope.ServiceProvider.GetRequiredService<ProjectService>();
                CreateProjectInDatabase(projectService, _project1).GetAwaiter().GetResult();
                CreateProjectInDatabase(projectService, _project2).GetAwaiter().GetResult();
            }
        }

        private Project CreateProjectObject()
        {
            var project = new Project()
            {
                Id = Guid.NewGuid().ToString(),
                Title = "test title",
                Description = "test desc",
                StartDate = DateTime.Now.ToUniversalTime(),
                EndDate = DateTime.Now.ToUniversalTime()
            };

            return project;
        }

        private async Task CreateProjectInDatabase(ProjectService projectService, Project newProject)
        {
            await projectService.CreateProject(newProject);
        }

        public void Dispose()
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var projectService = scope.ServiceProvider.GetRequiredService<ProjectService>();
                projectService.DeleteProject(_project1.Id).GetAwaiter().GetResult();
                projectService.DeleteProject(_project2.Id).GetAwaiter().GetResult();
            }
        }
        
        // Fetch all projects from cloud database and check property values
        [Fact]
        public async Task GetAllProjects()
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var projectService = scope.ServiceProvider.GetRequiredService<ProjectService>();
                var allProjects = await projectService.GetAllProjects();

                var list = allProjects.ToList<Project>();

                var firstProjectFromDatabase = list[0];
                var secondProjectFromDatabase = list[1];

                Assert.Equal(_project1.Id, firstProjectFromDatabase.Id);
                Assert.Equal(_project2.Id, secondProjectFromDatabase.Id);
            }
        }


    }
}