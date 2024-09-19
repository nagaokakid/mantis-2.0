namespace Backend.Data.DTO
{
    // Outgoing DTO (to frontend dashboard)
    public class UserBasicInfo
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public int ProjectCount { get; set; }
        public int TicketCount { get; set; }
        public int CompletedProjectCount { get; set; }
        public int CompletedTicketCount { get; set; }
    }
}
