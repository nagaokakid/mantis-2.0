using Backend.Data.Model;

namespace Backend.Data.DTO
{
    // Outgoing DTO
    public class ProjectDTO
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Status { get; set; }
        public Boolean isCompleted { get; set; }

        public ProjectDTO(Project project)
        {
            Id = project.Id;
            Title = project.Title;
            Description = project.Description;
            StartDate = project.StartDate;
            EndDate = project.EndDate;
            Status = project.Status;
            isCompleted = project.isCompleted;
        }
    }
}
