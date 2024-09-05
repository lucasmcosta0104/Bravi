using Bravi.Contract.Contato.Query.Response;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Bravi.Contract.Contato.Query.Request
{
    public class ObterContatoQueryRequest : IRequest<ObterContatoQueryResponse>
    {
        [FromRoute]
        public Guid Id { get; set; }
    }
}
