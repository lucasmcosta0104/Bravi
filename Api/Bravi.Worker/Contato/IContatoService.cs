using Bravi.Domain.Contato.Entities;

namespace Bravi.Worker.Contato
{
    public interface IContatoService
    {
        Task AdicionarAsync(ContatoEntity contato, CancellationToken cancellationToken);
        Task AlterarAsync(ContatoEntity contato, CancellationToken cancellationToken);
        Task ExcluirAsync(ContatoEntity contato, CancellationToken cancellationToken);
        Task<ContatoEntity> ObterAsync(Guid id, CancellationToken cancellationToken);
        Task<ICollection<ContatoEntity>> ObterListaAsync(CancellationToken cancellationToken);
    }
}
