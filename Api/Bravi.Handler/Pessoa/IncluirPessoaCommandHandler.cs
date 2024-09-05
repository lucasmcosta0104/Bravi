using AutoMapper;
using Bravi.Contract.Pessoa.Command.Request;
using Bravi.Domain.Generico.ExceptionBussines;
using Bravi.Domain.Generico.ValidateRequest;
using Bravi.Domain.Pessoa.Entities;
using Bravi.Worker.Pessoa;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Bravi.Handler.Pessoa
{
    public class IncluirPessoaCommandHandler : IRequestHandler<IncluirPessoaCommandRequest>
    {
        private readonly IPessoaService _pessoaService;
        private readonly ILogger<FiltroPessoaQueryHandler> _logger;
        private readonly IValidate _validate;
        private readonly IMapper _mapper;

        public IncluirPessoaCommandHandler(IPessoaService pessoaService, ILogger<FiltroPessoaQueryHandler> logger, IValidate validate, IMapper mapper)
        {
            _pessoaService = pessoaService;
            _logger = logger;
            _validate = validate;
            _mapper = mapper;
        }

        public async Task Handle(IncluirPessoaCommandRequest request, CancellationToken cancellationToken)
        {
            try
            {
                var pessoa = _mapper.Map<PessoaEntity>(request);
                await _pessoaService.AdicionarPessoaAsync(pessoa, cancellationToken);
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                throw new BussinesException(ex.Message, ex);
            }   
        }
    }
}
