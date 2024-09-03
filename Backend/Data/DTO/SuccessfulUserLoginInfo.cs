namespace Backend.Data.DTO
{
    public class SuccessfulUserLoginInfo
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public int ProjectCount { get; set; }
        public int TicketCount { get; set; }
    }
}
