using Bravi.Domain.Contato.Entities;
using Bravi.Infrastructure.Contato;

namespace Bravi.Worker.Contato
{
    public class ContatoService : IContatoService
    {
        private readonly IContatoRepository _contatoRepositoty;
        private readonly ILogger<ContatoService> _logger;

        public ContatoService(IContatoRepository contatoRepositoty, ILogger<ContatoService> logger)
        {
            _contatoRepositoty = contatoRepositoty;
            _logger = logger;
        }

        public async Task AdicionarAsync(ContatoEntity contato, CancellationToken cancellationToken)
        {
            await _contatoRepositoty.AdicionarAsync(contato, cancellationToken);
        }

        public async Task AlterarAsync(ContatoEntity contato, CancellationToken cancellationToken)
        {
            await _contatoRepositoty.AlterarAsync(contato, cancellationToken);
        }

        public async Task ExcluirAsync(ContatoEntity contato, CancellationToken cancellationToken)
        {
            await _contatoRepositoty.ExcluirAsync(contato, cancellationToken);
        }

        public async Task<ContatoEntity> ObterAsync(Guid id, CancellationToken cancellationToken)
        {
            return await _contatoRepositoty.ObterAsync(id, cancellationToken);
        }

        public async Task<ICollection<ContatoEntity>> ObterListaAsync(CancellationToken cancellationToken)
        {
            return await _contatoRepositoty.ObterListaAsync(cancellationToken);
        }
    }
}
