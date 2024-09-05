using AutoMapper;
using Bravi.Contract.Contato.Query.Request;
using Bravi.Contract.Contato.Query.Response;
using Bravi.Domain.Contato.Dto;
using Bravi.Helper;
using Bravi.Infrastructure.Contato;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Bravi.Handler.Contato
{
    public class ListaContatoQueryHandler : IRequestHandler<ListaContatoQueryRequest, ListaContatoQueryResponse>
    {
        private readonly ILogger<ListaContatoQueryHandler> _logger;
        private readonly IMapper _mapper;
        private readonly IContatoRepository _contatoRepositoty;

        public ListaContatoQueryHandler(ILogger<ListaContatoQueryHandler> logger, IMapper mapper, IContatoRepository contatoRepositoty)
        {
            _logger = logger;
            _mapper = mapper;
            _contatoRepositoty = contatoRepositoty;
        }

        public async Task<ListaContatoQueryResponse> Handle(ListaContatoQueryRequest request, CancellationToken cancellationToken)
        {
            var query = await _contatoRepositoty.ListaContatoQueryAsync(request.Id ,cancellationToken);

            var dto = await HelperFilter<ContatoDto>.Filter(request.ModelFilter, query, cancellationToken);

            return new ListaContatoQueryResponse
            {
                Itens = dto,
            };
        }
    }
}
