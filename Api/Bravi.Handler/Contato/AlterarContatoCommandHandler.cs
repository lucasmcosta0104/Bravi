using AutoMapper;
using Bravi.Contract.Contato.Command.Request;
using Bravi.Domain.Contato.Entities;
using Bravi.Worker.Contato;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Bravi.Handler.Contato
{
    public class AlterarContatoCommandHandler : IRequestHandler<AlterarContatoCommandRequest>
    {
        private readonly IContatoService _contatoService;
        private readonly ILogger<AlterarContatoCommandHandler> _logger;
        private readonly IMapper _mapper;

        public AlterarContatoCommandHandler(IContatoService contatoService, ILogger<AlterarContatoCommandHandler> logger, IMapper mapper)
        {
            _contatoService = contatoService;
            _logger = logger;
            _mapper = mapper;
        }

        public async Task Handle(AlterarContatoCommandRequest request, CancellationToken cancellationToken)
        {
            var contato = await _contatoService.ObterAsync(request.Id, cancellationToken);
            _mapper.Map<AlterarContatoCommandRequest, ContatoEntity>(request, contato);
            await _contatoService.AlterarAsync(contato, cancellationToken);
        }
    }
}
