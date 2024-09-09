interface IProject
{
    id: string,
    title: string[100],
    description: string[500],
    startDate: Date,
    endDate: Date | null,
    status: string,
    isCompleted: boolean
}

export default IProject

/*
        [Key]
        public string Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Title { get; set; }

        [MaxLength (500)]
        public string? Description { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        public DateTime? EndDate {  get; set; }
        
        [Required]
        public string Status { get; set; }

        [Required]
        public Boolean isCompleted {  get; set; }
*/