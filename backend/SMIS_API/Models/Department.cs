﻿namespace SMIS_API.Models
{
    public class Department
    {
        public int Id { get; set; }
        public string? DepartmentName { get; set; }
        public string? DepartmentHead { get; set; } 
        public int StartDate { get; set; }
        public int NumberOfStudents { get; set; }
    }
}
