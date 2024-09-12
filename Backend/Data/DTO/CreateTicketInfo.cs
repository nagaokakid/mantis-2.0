using Backend.Data.Model;
using System.ComponentModel.DataAnnotations;

namespace Backend.Data.DTO
{
    // Incoming DTO
    public class CreateTicketInfo
    {
        [Required]
        public string UserId { get; set; }
        [Required]
        public Ticket Ticket { get; set; }
    }
}
