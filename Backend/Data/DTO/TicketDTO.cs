using Backend.Data.Model;
using System.ComponentModel.DataAnnotations;

namespace Backend.Data.DTO
{
    // Outgoing DTO
    public class TicketDTO
    {
        [Required]
        public string Id { get; set; }
        
        public string ProjectId { get; set; }
        
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
        public string Priority { get; set; }
        
        [Required]
        public string Difficulty { get; set; }
        
        [Required]
        public Boolean isCompleted { get; set; }

        public TicketDTO(Ticket ticket)
        {
            Id = ticket.Id;
            ProjectId = ticket.ProjectId;
            Title = ticket.Title;
            Description = ticket.Description;
            Created = ticket.Created;
            StartDate = ticket.StartDate;
            EndDate = ticket.EndDate;
            Status = ticket.Status;
            Priority = ticket.Priority;
            Difficulty = ticket.Difficulty;
            isCompleted = ticket.isCompleted;
        }
    }
}
