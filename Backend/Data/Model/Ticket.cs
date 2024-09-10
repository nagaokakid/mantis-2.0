using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Data.Model
{
    // 1-to-M relationship btwn project and ticket table
    public class Ticket
    {

        [Key]
        public string Id {  get; set; }

        // Foreign key
        [ForeignKey("Project")]
        public string ProjectId {  get; set; }
        
        public Project Project {  get; set; }

        [Required]
        [MaxLength (100)]
        public string Title { get; set; }

        [MaxLength (500)]
        public string Description { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        public DateTime EndDate {  get; set; }

        [Required]
        public string Status { get; set; }

        [Required]
        public string Priority { get; set; }

        [Required]
        public string Difficulty {  get; set; }

        [Required]
        public Boolean isCompleted { get; set; }

        // Navigation property for many-to-many relationship
        public ICollection<UserTicket> UserTickets { get; set; } = new List<UserTicket>();

    }
}