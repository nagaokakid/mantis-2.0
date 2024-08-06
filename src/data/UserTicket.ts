interface UserTicket
{
    Id: string,
    UserId: string,
    TicketId: string
}

export default UserTicket

/*
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
*/