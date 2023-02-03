namespace SMIS_API.Models
{
    public class Exam
    {
        public int Id { get; set; }
        public int SubjectId { get; set; }

        public int TeacherId { get; set; }

        public DateTime Date { get; set; }
    }
}
