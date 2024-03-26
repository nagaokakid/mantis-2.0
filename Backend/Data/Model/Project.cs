
namespace Backend.Data.Model
{
    public class Project
    {
        public string ProjectId { get; set; }
        public int UserIds{ get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreationDate { get; set; }
    }
}
