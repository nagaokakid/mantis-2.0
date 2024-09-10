using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Data.Model
{
    // 1-to-M relationship btwn user -> comment AND ticket -> comment
    public class Comment
    {
        [Key]
        public string Id { get; set; }

        // Foreign key
        [ForeignKey("User")]
        public string UserId {  get; set; }

        // Foreign key
        [ForeignKey("Ticket")]
        public string TicketId { get; set; }

        public User User { get; set; }

        public Ticket Ticket { get; set; }

        [Required]
        public string Text {  get; set; }

        [Required]
        public string Author {  get; set; }

        [Required]
        public DateTime Date {  get; set; }
    }
}