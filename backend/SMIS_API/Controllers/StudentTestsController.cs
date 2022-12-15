using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SMIS_API.Data;
using SMIS_API.Models;

namespace SMIS_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentTestsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public StudentTestsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/StudentTests
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudentTest>>> GetStudentTest()
        {
            return await _context.StudentTest.ToListAsync();
        }

        // GET: api/StudentTests/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StudentTest>> GetStudentTest(int id)
        {
            var studentTest = await _context.StudentTest.FindAsync(id);

            if (studentTest == null)
            {
                return NotFound();
            }

            return studentTest;
        }

        // PUT: api/StudentTests/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStudentTest(int id, StudentTest studentTest)
        {
            if (id != studentTest.Id)
            {
                return BadRequest();
            }

            _context.Entry(studentTest).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentTestExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/StudentTests
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<StudentTest>> PostStudentTest(StudentTest studentTest)
        {
            _context.StudentTest.Add(studentTest);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStudentTest", new { id = studentTest.Id }, studentTest);
        }

        // DELETE: api/StudentTests/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudentTest(int id)
        {
            var studentTest = await _context.StudentTest.FindAsync(id);
            if (studentTest == null)
            {
                return NotFound();
            }

            _context.StudentTest.Remove(studentTest);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StudentTestExists(int id)
        {
            return _context.StudentTest.Any(e => e.Id == id);
        }
    }
}
