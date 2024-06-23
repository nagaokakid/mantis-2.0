using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Data.Model
{
    // M-to-N relationship between User and Projects table
    public class UserProjects
    {
        [Key]
        public string Id {  get; set; }

        // Foreign key
        public string UserId {  get; set; }

        // Foreign key
        public string ProjectId {  get; set; }

        [ForeignKey("UserId")]
        public Users User { get; set; }

        [ForeignKey("ProjectId")]
        public Projects Project {  get; set; }
    }
}
