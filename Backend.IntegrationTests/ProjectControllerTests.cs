using Xunit;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Testing;
using Backend;
using Backend.Data.Model;
using static System.Net.WebRequestMethods;

namespace Backend.IntegrationTests
{
    public class ProjectControllerTests : IDisposable, IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly HttpClient _client;
        private String _baseURL = "https://mantis-2-0-backend.onrender.com/api/project";
        private Project _project = new Project()
        {
            Id = Guid.NewGuid().ToString(),
            Title = "test title",
            Description = "test description",
            StartDate = DateTime.Now,
            EndDate = DateTime.Now
        };

        public ProjectControllerTests(WebApplicationFactory<Program> factory)
        {
            _client = factory.CreateClient();
        }

        public void Dispose()
        {
            _client.Dispose();
        }

        [Fact]
        public void CreateProjectReturns201()
        {

        }
    }
}