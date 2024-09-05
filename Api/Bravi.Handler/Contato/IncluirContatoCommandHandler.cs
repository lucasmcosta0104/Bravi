using AutoMapper;
using Bravi.Contract.Contato.Command.Request;
using Bravi.Domain.Contato.Entities;
using Bravi.Worker.Contato;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Bravi.Handler.Contato
{
    public class IncluirContatoCommandHandler : IRequestHandler<IncluirContatoCommandRequest>
    {
        private readonly IContatoService _contatoService;
        private readonly ILogger<IncluirContatoCommandHandler> _logger;
        private readonly IMapper _mapper;

        public IncluirContatoCommandHandler(IContatoService contatoService, ILogger<IncluirContatoCommandHandler> logger, IMapper mapper)
        {
            _contatoService = contatoService;
            _logger = logger;
            _mapper = mapper;
        }

        public async Task Handle(IncluirContatoCommandRequest request, CancellationToken cancellationToken)
        {
            var contato = _mapper.Map<ContatoEntity>(request);
            await _contatoService.AdicionarAsync(contato, cancellationToken);
        }
    }
}
