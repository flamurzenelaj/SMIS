namespace SMIS_API.Models
{
    public class Student
    {
        public int Id { get; set; }
        public string? FullName { get; set; }
        public string? Gender { get; set; }
        public string? DateOfBirth { get; set; }
        public long Phone { get; set; }
        public string UserId { get; set; }
    }
}
