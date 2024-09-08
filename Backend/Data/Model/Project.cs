using System.ComponentModel.DataAnnotations;

namespace Backend.Data.Model
{

    public class Project
    {
        [Key]
        public string Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Title { get; set; }

        [MaxLength (500)]
        public string? Description { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        public DateTime? EndDate {  get; set; }
        
        [Required]
        public string Status { get; set; }

        [Required]
        public Boolean isCompleted {  get; set; }

    }
}
