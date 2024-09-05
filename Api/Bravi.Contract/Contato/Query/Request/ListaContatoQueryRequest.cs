using Bravi.Contract.Contato.Query.Response;
using Bravi.Domain.Generico.Filter;
using MediatR;

namespace Bravi.Contract.Contato.Query.Request
{
    public class ListaContatoQueryRequest : CommandBase, IRequest<ListaContatoQueryResponse>
    {
        public ModelFilter ModelFilter { get; set; }
    }
}
