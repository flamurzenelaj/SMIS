using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SMIS_API.Data;
using SMIS_API.Models;

namespace SMIS_API.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    [ApiController]
    public class ExamsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ExamsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Examss
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Exam>>> GetExams()
        {
            return await _context.Exams.ToListAsync();
        }

        // GET: api/Examss/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Exam>> GetExam(int id)
        {
            var Exam = await _context.Exams.FindAsync(id);

            if (Exam == null)
            {
                return NotFound();
            }

            return Exam;
        }

        // PUT: api/Examss/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExam(int id, Exam Exam)
        {
            if (id != Exam.Id)
            {
                return BadRequest();
            }

            _context.Entry(Exam).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExamExists(id))
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

        // POST: api/Examss
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Exam>> PostExams(Exam Exam)
        {
            _context.Exams.Add(Exam);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetExam", new { id = Exam.Id }, Exam);
        }

        // DELETE: api/Examss/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExam(int id)
        {
            var Exam = await _context.Exams.FindAsync(id);
            if (Exam == null)
            {
                return NotFound();
            }

            _context.Exams.Remove(Exam);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ExamExists(int id)
        {
            return _context.Exams.Any(e => e.Id == id);
        }
    }
}
