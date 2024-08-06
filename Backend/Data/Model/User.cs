using System.ComponentModel.DataAnnotations;

namespace Backend.Data.Model
{
    public class User
    {
        [Key]
        public string Id { get; set; }

        [Required]
        public string FirstName {  get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public bool EmailConfirmed { get; set; }
 
        
    }
}