using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Data.Model
{
    // M-to-N relationship between User and Ticket table
    public class UserTickets
    {
        [Key]
        public string Id {  get; set; }

        // Foreign key
        public string UserId { get; set; }

        // Foreign key
        public string TicketId { get; set; }

        [ForeignKey("UserId")]
        public Users User {  get; set; }

        [ForeignKey("TicketId")]
        public Tickets Ticket {  get; set; }
    }
}
