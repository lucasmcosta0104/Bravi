using Bravi.Domain.Contato.Dto;
using Bravi.Domain.Contato.Entities;

namespace Bravi.Infrastructure.Contato
{
    public interface IContatoRepository
    {
        Task AdicionarAsync(ContatoEntity contato, CancellationToken cancellationToken);
        Task AlterarAsync(ContatoEntity contato, CancellationToken cancellationToken);
        Task ExcluirAsync(ContatoEntity contato, CancellationToken cancellationToken);
        Task<ContatoEntity> ObterAsync(Guid id, CancellationToken cancellationToken);
        Task<ICollection<ContatoEntity>> ObterListaAsync(CancellationToken cancellationToken);
        Task<IQueryable<ContatoEntity>> Query();
        Task<IQueryable<ContatoDto>> ListaContatoQueryAsync(Guid IdPessoa, CancellationToken cancellationToken);
        Task<ContatoDto> ContatoQueryAsync(Guid id, CancellationToken cancellationToken);
    }
}
