using Backend.Data.Model;

namespace Backend.Data.DTO
{
    // Incoming DTO
    public class CreateProjectInfo
    {
        public string UserId { get; set; }
        public Project Project { get; set; }
    }
}
