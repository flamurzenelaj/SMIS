using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SMIS_API.Dto;
using SMIS_API.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace SMIS_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public static User user = new User();
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _context;

        public AuthController(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(UserDto request)
        {
            if(request.Username.Length == 0 || request.Username == null) return BadRequest(new { msg = "Username is empty" });
            if (request.Password.Length == 0 || request.Password == null) return BadRequest(new { msg = "Password is empty" });
            User user = new();
            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);
            user.Username = request.Username;
            user.Uid = request.Uuid;
            user.Role = request.UserRole ;
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            var foundUser = await _context.Users.AsQueryable()
                .Where(dbUser => (dbUser.Uid == user.Uid) || (dbUser.Username == user.Username)).ToListAsync();

            if (foundUser.Any()) return BadRequest(new { msg = "User already exists" });
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return Ok(new { msg = "Registered Successfully" });
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(UserLoginDto request)
        {
            User user = await _context.Users.FirstOrDefaultAsync(dbUser => dbUser.Username == request.Username);

                if (user == null)
            {
                return BadRequest("User not found.");
            }

            if(!VerifyPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt))
            {
                return BadRequest("Wrong password");
            }

            string UserRole = user.Role == "Admin" ? "Admin" : user.Role == "Teacher" ? "Teacher" : "Student";

            string jwtToken = CreateToken(user, UserRole);
            return Ok(new { token = jwtToken });
        }

        private string CreateToken(User user, string userRole)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Name, user.Uid),
                new Claim(ClaimTypes.Role, userRole)
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims, 
                expires: DateTime.Now.AddDays(1), 
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using(var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }
    }
}
