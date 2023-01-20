using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SMIS_API.Models;

namespace src.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<User>>> Get()
        {
            var dbUsers = await _context.Users.ToListAsync();
            if (dbUsers == null)
            {
                return Ok("No Users found");
            }
            return Ok(new { Users = dbUsers, status = "OK" });
        }
    
        [HttpGet("{uid}")]
        public async Task<ActionResult<List<User>>> Get(string uid)
        {
            var User = await _context.Users.FirstOrDefaultAsync(dbUser => dbUser.Uid == uid).ConfigureAwait(false);
            if (User == null)
            {
                return BadRequest(new { Error = "User not found." });
            }

            return Ok(User);
        }

        [HttpPost]
        public async Task<ActionResult<List<User>>> AddUser(User User)
        {
            _context.Users.Add(User);
            await _context.SaveChangesAsync();
            return Ok(await _context.Users.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<User>>> UpdateUser(User User)
        {
            var dbUser = await _context.Users.FindAsync(User.Id);
            if (dbUser == null)
                return BadRequest("User not found.");
            dbUser.Username = User.Username;
            dbUser.Uid = User.Uid;

            await _context.SaveChangesAsync();

            return Ok(await _context.Users.ToListAsync());
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<User>>> DeleteUser(string id)
        {
            var dbUser = await _context.Users.FindAsync(id);
            if (dbUser == null)
                return BadRequest("User not found.");

            _context.Users.Remove(dbUser);
            await _context.SaveChangesAsync();
            return Ok(await _context.Users.ToListAsync());
        }
    }
}

