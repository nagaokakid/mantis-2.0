interface Project
{
    Id: string,
    Title: string,
    Description: string,
    StartDate: Date,
    EndDate: Date
}

export default Project

/*
        [Key]
        public string Id { get; set; }

        [Required]
        public string Title { get; set; }

        public string Description { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        public DateTime EndDate {  get; set; } 
*/