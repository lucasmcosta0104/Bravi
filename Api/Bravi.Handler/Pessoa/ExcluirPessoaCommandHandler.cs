using Bravi.Contract.Pessoa.Command.Request;
using Bravi.Worker.Pessoa;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Bravi.Handler.Pessoa
{
    public class ExcluirPessoaCommandHandler : IRequestHandler<ExcluirPessoaCommandRequest>
    {
        private readonly IPessoaService _pessoaService;
        private readonly ILogger<ExcluirPessoaCommandHandler> _logger;

        public ExcluirPessoaCommandHandler(IPessoaService pessoaService, ILogger<ExcluirPessoaCommandHandler> logger)
        {
            _pessoaService = pessoaService;
            _logger = logger;
        }

        public async Task Handle(ExcluirPessoaCommandRequest request, CancellationToken cancellationToken = default)
        {
            _logger.LogInformation("Processo de exclusão de pessoa iniciado pelo id");
            
            await _pessoaService.ExcluirPessoaAsync(request.Id, cancellationToken);
        }
    }
}
