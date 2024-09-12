﻿using Backend.Data.Model;
using System.ComponentModel.DataAnnotations;

namespace Backend.Data.DTO
{
    // Incoming DTO
    public class CreateProjectInfo
    {
        [Required]
        public string UserId { get; set; }
        [Required]
        public Project Project { get; set; }
    }
}
