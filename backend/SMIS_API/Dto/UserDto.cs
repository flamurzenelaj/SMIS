﻿namespace SMIS_API.Dto
{
    public class UserDto
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Uuid { get; set; } = string.Empty;
        public string UserRole { get; set; }

    }
}
