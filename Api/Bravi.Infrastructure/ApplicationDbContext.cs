using Bravi.Domain.Contato.Entities;
using Bravi.Domain.Pessoa.Entities;
using Microsoft.EntityFrameworkCore;

namespace Bravi.Infrastructure
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<PessoaEntity> Pessoa { get; set; }
        public DbSet<ContatoEntity> Contato { get; set; }
    }
}
