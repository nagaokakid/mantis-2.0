interface Comment
{
    Id: string,
    UserId: string,
    TicketId: string,
    Text: string,
    Author: string,
    Date: Date
}

export default Comment

/*
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
*/