using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Data.Model
{
    // M-to-N relationship between User and Ticket table
    public class UserTicket
    {
        // Foreign key (composite)
        [ForeignKey("User")]
        public string UserId { get; set; }

        // Foreign key (composite)
        [ForeignKey("Ticket")]
        public string TicketId { get; set; }

        // Navigation properties for tables
        public User User {  get; set; }
        public Ticket Ticket {  get; set; }
    }
}
