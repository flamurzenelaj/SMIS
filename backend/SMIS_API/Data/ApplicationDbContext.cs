using Microsoft.EntityFrameworkCore;
using SMIS_API.Models;

namespace SMIS_API.Data
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        public DbSet<Department> Department { get; set; }
        public DbSet<SMIS_API.Models.Student> Student { get; set; }

    }
}
