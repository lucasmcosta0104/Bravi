using Bravi.Domain.Pessoa.Dto;
using Bravi.Domain.Pessoa.Entities;

namespace Bravi.Infrastructure.Pessoa
{
    public interface IPessoaRepository
    {
        Task EditarPessoaAsync(PessoaEntity pessoa, CancellationToken cancellationToken);
        Task<PessoaEntity> ObterPessoaAsync(Guid id, CancellationToken cancellationToken);
        Task<ObterPessoaDto> ObtBraviessoaQueryAsync(Guid id, CancellationToken cancellationToken);
        Task<IQueryable<FiltroPessoaDto>> ObtBraviessoaListAsync();
        Task AdicionarPessoaAsync(PessoaEntity pessoa, CancellationToken cancellationToken);
        Task SaveChagensAsync(CancellationToken cancellationToken);
    }
}
