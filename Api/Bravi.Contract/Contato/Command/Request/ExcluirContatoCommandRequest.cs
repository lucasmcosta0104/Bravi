using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Bravi.Contract.Contato.Command.Request
{
    public class ExcluirContatoCommandRequest : IRequest
    {
        [FromRoute]
        public Guid Id { get; set; }
    }
}
