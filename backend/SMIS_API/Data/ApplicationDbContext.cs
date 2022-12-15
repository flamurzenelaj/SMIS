using Microsoft.EntityFrameworkCore;
using SMIS_API.Models;

namespace SMIS_API.Data
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        public DbSet<StudentTest> StudentTest { get; set; }

    }
}
