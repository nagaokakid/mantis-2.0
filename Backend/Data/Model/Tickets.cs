using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Data.Model
{
    // 1-to-M relationship btwn project and ticket table
    public class Tickets
    {
        [Key]
        public string Id {  get; set; }

        // Foreign key
        [Required]
        public string ProjectId {  get; set; }
        
        [ForeignKey("ProjectId")]
        public Projects Project {  get; set; }

        [Required]
        public string Title { get; set; }

        public string Description { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        public DateTime EndDate {  get; set; }

        [Required]
        public string Priority { get; set; }

        public string Difficulty {  get; set; }
        
        // file path OR location property?


    }
}