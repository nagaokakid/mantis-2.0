using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Backend.Data.Model
{
    public class Project
    {
        public string ProjectId { get; set; }
        public int UserId{ get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreationDate { get; set; }
    }
}
