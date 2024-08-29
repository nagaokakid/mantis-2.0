interface UserProject
{
    Id: string,
    UserId: string,
    ProjectId: string
}

export default UserProject

/*
        [Key]
        public string Id {  get; set; }

        // Foreign key
        public string UserId {  get; set; }

        // Foreign key
        public string ProjectId {  get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; }

        [ForeignKey("ProjectId")]
        public Project Project {  get; set; }
*/