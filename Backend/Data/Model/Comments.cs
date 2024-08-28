using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Data.Model
{
    // 1-to-M relationship btwn user -> comment AND ticket -> comment
    public class Comments
    {
        [Key]
        public string Id { get; set; }

        // Foreign key
        [Required]
        public string UserId {  get; set; }

        // Foreign key
        [Required]
        public string TicketId { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; }

        [ForeignKey("TicketId")]
        public Ticket Ticket { get; set; }

        [Required]
        public string Text {  get; set; }

        [Required]
        public string Author {  get; set; }

        [Required]
        public DateTime Date {  get; set; }
    }
}