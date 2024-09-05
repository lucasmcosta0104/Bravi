using Bravi.Domain.Contato.Dto;
using Bravi.Domain.Contato.Entities;
using Bravi.Domain.Pessoa.Entities;
using Microsoft.EntityFrameworkCore;

namespace Bravi.Infrastructure.Contato
{
    public class ContatoRepository : BaseRepository, IContatoRepository
    {
        public ContatoRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task AdicionarAsync(ContatoEntity Contato, CancellationToken cancellationToken)
        {
            _context.Contato.Add(Contato);
            await _context.SaveChangesAsync(cancellationToken);
        }

        public async Task AlterarAsync(ContatoEntity Contato, CancellationToken cancellationToken)
        {
            _context.Contato.Update(Contato);
            await _context.SaveChangesAsync(cancellationToken);
        }

        public async Task ExcluirAsync(ContatoEntity Contato, CancellationToken cancellationToken)
        {
            _context.Contato.Remove(Contato);
            await _context.SaveChangesAsync(cancellationToken);
        }

        public async Task<ContatoEntity> ObterAsync(Guid id, CancellationToken cancellationToken)
        {
            return await _context.Contato
                .FirstOrDefaultAsync(x => x.Id.Equals(id), cancellationToken);
        }

        public async Task<ICollection<ContatoEntity>> ObterListaAsync(CancellationToken cancellationToken)
        {
            return await _context.Contato
                .ToListAsync(cancellationToken);
        }

        public async Task<IQueryable<ContatoEntity>> Query()
        {
            return _context.Contato.AsNoTracking().AsQueryable();
        }

        public async Task<IQueryable<ContatoDto>> ListaContatoQueryAsync(Guid idPessoa, CancellationToken cancellationToken)
        {
            return _context.Contato.Where(x => idPessoa == Guid.Empty || x.PessoaId == idPessoa)
                .Select(e => new ContatoDto
                {
                    Id = e.Id,
                    Email = e.Email,
                    Nome = e.Nome,
                    PessoaId = e.PessoaId,
                    Telefone = e.Telefone,
                    WhatsApp = e.WhatsApp,
                    DataCriacao = e.DataCriacao
                });
        }

        public async Task<ContatoDto> ContatoQueryAsync(Guid id, CancellationToken cancellationToken)
        {
            return await _context.Contato
                .Select(e => new ContatoDto
                {
                    Id = e.Id,
                    Email = e.Email,
                    Nome = e.Nome,
                    PessoaId = e.PessoaId,
                    Telefone = e.Telefone,
                    WhatsApp = e.WhatsApp

                }).FirstOrDefaultAsync(x => x.Id.Equals(id), cancellationToken);
        }
    }
}
