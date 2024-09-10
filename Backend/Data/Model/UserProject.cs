using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Data.Model
{
    // M-to-N relationship between User and Projects table
    public class UserProject
    {

        // Foreign key (composite)
        [ForeignKey("User")]
        public string UserId {  get; set; }

        // Foreign key (composite)
        [ForeignKey("Project")]
        public string ProjectId {  get; set; }

        // Navigation properties for tables
        public User User { get; set; }
        public Project Project {  get; set; }
    }
}
