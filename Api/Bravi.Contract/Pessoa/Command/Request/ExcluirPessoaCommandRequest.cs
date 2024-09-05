using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Bravi.Contract.Pessoa.Command.Request
{
    public class ExcluirPessoaCommandRequest : IRequest
    {
        [FromRoute]
        public Guid Id { get; set; }
    }
}
