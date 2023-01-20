namespace SMIS_API.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Uid { get; set; } = string.Empty;
        public string Role { get; set; }
        public string Username { get; set; } = string.Empty;
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
    }
}
