namespace SMIS_API.Models
{
    public class Teacher
    {
        public int Id { get; set; }
        public string FullName { get; set; }

        public string Department { get; set; }
        public long PhoneNumber { get; set; }
        public string Gender { get; set; }
        public string Qualification { get; set; }

    }
}
