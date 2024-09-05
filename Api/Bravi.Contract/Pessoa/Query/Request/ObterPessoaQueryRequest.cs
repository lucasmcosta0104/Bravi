using Bravi.Contract.Pessoa.Query.Response;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Bravi.Contract.Pessoa.Query.Request
{
    public class ObterPessoaQueryRequest : IRequest<ObterPessoaQueryResponse>
    {
        [FromRoute]
        public Guid Id { get; set; }
  
    }
}
