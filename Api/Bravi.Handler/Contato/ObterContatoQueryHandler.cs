using AutoMapper;
using Bravi.Contract.Contato.Query.Request;
using Bravi.Contract.Contato.Query.Response;
using Bravi.Infrastructure.Contato;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Bravi.Handler.Contato
{
    public class ObterContatoQueryHandler : IRequestHandler<ObterContatoQueryRequest, ObterContatoQueryResponse>
    {
        private readonly ILogger<IncluirContatoCommandHandler> _logger;
        private readonly IMapper _mapper;
        private readonly IContatoRepository _contatoRepositoty;

        public ObterContatoQueryHandler(ILogger<IncluirContatoCommandHandler> logger, IMapper mapper, IContatoRepository contatoRepositoty)
        {
            _logger = logger;
            _mapper = mapper;
            _contatoRepositoty = contatoRepositoty;
        }

        public async Task<ObterContatoQueryResponse> Handle(ObterContatoQueryRequest request, CancellationToken cancellationToken)
        {
            var dto = await _contatoRepositoty.ContatoQueryAsync(request.Id, cancellationToken);
            return new ObterContatoQueryResponse
            {
                ContatoDto = dto
            };
        }
    }
}
