using Backend.Data.Model;
using System.ComponentModel.DataAnnotations;

namespace Backend.Data.DTO
{
    // Outgoing DTO
    public class ProjectDTO
    {
        [Required]
        public string Id { get; set; }
        
        [Required]
        public string Title { get; set; }
        
        public string? Description { get; set; }
        
        [Required]
        public DateTime Created { get; set; }
        
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        
        [Required]
        public string Status { get; set; }
        
        [Required]
        public Boolean isCompleted { get; set; }

        public ProjectDTO(Project project)
        {
            Id = project.Id;
            Title = project.Title;
            Description = project.Description;
            Created = project.Created;
            StartDate = project.StartDate;
            EndDate = project.EndDate;
            Status = project.Status;
            isCompleted = project.isCompleted;
        }
    }
}
