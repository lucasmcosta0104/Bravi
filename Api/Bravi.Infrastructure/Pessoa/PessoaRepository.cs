using Bravi.Domain.Pessoa.Dto;
using Bravi.Domain.Pessoa.Entities;
using Microsoft.EntityFrameworkCore;

namespace Bravi.Infrastructure.Pessoa
{
    public class PessoaRepository : BaseRepository, IPessoaRepository
    {
        public PessoaRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task AdicionarPessoaAsync(PessoaEntity pessoa, CancellationToken cancellationToken)
        {
            _context.Pessoa.Add(pessoa);
            await _context.SaveChangesAsync(cancellationToken);
        }

        public async Task EditarPessoaAsync(PessoaEntity pessoa, CancellationToken cancellationToken)
        {
            _context.Pessoa.Update(pessoa);
            await _context.SaveChangesAsync(cancellationToken);
        }

        public async Task<PessoaEntity> ObterPessoaAsync(Guid id, CancellationToken cancellationToken)
        {
           return await _context.Pessoa.FirstOrDefaultAsync(x => x.Id.Equals(id), cancellationToken);
        }

        public async Task<IQueryable<FiltroPessoaDto>> ObtBraviessoaListAsync()
        {
            return _context.Pessoa
                .Select(x => new FiltroPessoaDto
                {
                    Id = x.Id,
                    Documento = x.Documento,
                    Email = x.Email,
                    Nome = x.Nome,
                    Telefone = x.Telefone,
                    TipoPessoa = (int)x.TipoPessoa,
                    DataCriacao = x.DataCriacao
                }).AsNoTracking();
        }

        public async Task<ObterPessoaDto> ObtBraviessoaQueryAsync(Guid id, CancellationToken cancellationToken)
        {
            return await _context.Pessoa
                .Include(x => x.Contatos)
                .Select(x => new ObterPessoaDto
                {
                    Id = x.Id,
                    Documento = x.Documento,
                    Email = x.Email,
                    Nome = x.Nome,
                    Telefone = x.Telefone,
                    TipoPessoa = (int)x.TipoPessoa,
                    DataCriacao = x.DataCriacao
                })
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id.Equals(id), cancellationToken);
        }

        public async Task SaveChagensAsync(CancellationToken cancellationToken)
        {
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
