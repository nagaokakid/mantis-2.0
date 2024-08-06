using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Data.Model
{
    // M-to-N relationship between User and Ticket table
    public class UserTicket
    {
        [Key]
        public string Id {  get; set; }

        // Foreign key
        public string UserId { get; set; }

        // Foreign key
        public string TicketId { get; set; }

        [ForeignKey("UserId")]
        public User User {  get; set; }

        [ForeignKey("TicketId")]
        public Ticket Ticket {  get; set; }
    }
}
