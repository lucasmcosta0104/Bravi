using AutoMapper;
using Bravi.Contract.Contato.Command.Request;
using Bravi.Worker.Contato;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Bravi.Handler.Contato
{
    public class ExcluirContatoCommandHandler : IRequestHandler<ExcluirContatoCommandRequest>
    {
        private readonly IContatoService _contatoService;
        private readonly ILogger<ExcluirContatoCommandHandler> _logger;
        private readonly IMapper _mapper;

        public ExcluirContatoCommandHandler(IContatoService contatoService, ILogger<ExcluirContatoCommandHandler> logger, IMapper mapper)
        {
            _contatoService = contatoService;
            _logger = logger;
            _mapper = mapper;
        }

        public async Task Handle(ExcluirContatoCommandRequest request, CancellationToken cancellationToken)
        {
            var contato = await _contatoService.ObterAsync(request.Id, cancellationToken);

            if (contato != null)
                await _contatoService.ExcluirAsync(contato, cancellationToken);

        }
    }
}
