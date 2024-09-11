interface Ticket
{
    id: string,
    projectId: string,
    title: string,
    description: string,
    created: Date,
    startDate: Date | null,
    endDate: Date | null,
    priority: string,
    difficulty: string
}

export default Ticket

/*
        [Key]
        public string Id {  get; set; }

        // Foreign key
        [Required]
        public string ProjectId {  get; set; }
        
        [ForeignKey("ProjectId")]
        public Project Project {  get; set; }

        [Required]
        public string Title { get; set; }

        public string Description { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        public DateTime EndDate {  get; set; }

        [Required]
        public string Priority { get; set; }

        public string Difficulty {  get; set; }
        
        // file path OR location property?
*/