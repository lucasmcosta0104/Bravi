using Bravi.Domain.Pessoa.Entities;
using Microsoft.EntityFrameworkCore;

namespace Bravi.Domain.Pessoa.Map
{
    public static class PessoaMap
    {
        public static void ModelBuilder(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PessoaEntity>()
            .HasMany(p => p.Contatos)
            .WithOne(p => p.Pessoa)
            .HasForeignKey(x => x.PessoaId);
        }
    }
}
