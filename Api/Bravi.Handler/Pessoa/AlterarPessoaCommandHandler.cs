using AutoMapper;
using Bravi.Contract.Pessoa.Command.Request;
using Bravi.Domain.Pessoa.Entities;
using Bravi.Worker.Pessoa;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Bravi.Handler.Pessoa
{
    public class AlterarPessoaCommandHandler : IRequestHandler<AlterarPessoaCommandRequest>
    {
        private readonly IPessoaService _pessoaService;
        private readonly ILogger<AlterarPessoaCommandHandler> _logger;
        private readonly IMapper _mapper;

        public AlterarPessoaCommandHandler(IPessoaService pessoaService, ILogger<AlterarPessoaCommandHandler> logger, IMapper mapper)
        {
            _pessoaService = pessoaService;
            _logger = logger;
            _mapper = mapper;
        }

        public async Task Handle(AlterarPessoaCommandRequest request, CancellationToken cancellationToken)
        {
            try
            {
                var pessoa = await _pessoaService.ObterPessoaAsync(request.Id, cancellationToken);
                _mapper.Map<AlterarPessoaCommandRequest, PessoaEntity>(request, pessoa);
                await _pessoaService.AlterarPessoaAsync(pessoa, cancellationToken);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                throw new Exception(ex.Message, ex);
            }
        }
    }
}
