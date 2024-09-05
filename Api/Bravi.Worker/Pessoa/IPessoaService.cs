using Bravi.Domain.Pessoa.Dto;
using Bravi.Domain.Pessoa.Entities;

namespace Bravi.Worker.Pessoa
{
    public interface IPessoaService
    {
        Task ExcluirPessoaAsync(Guid id, CancellationToken cancellationToken);
        Task AdicionarPessoaAsync(PessoaEntity pessoa, CancellationToken cancellationToken);
        Task AlterarPessoaAsync(PessoaEntity pessoa, CancellationToken cancellationToken);
        Task<PessoaEntity> ObterPessoaAsync(Guid id, CancellationToken cancellationToken);
    }
}