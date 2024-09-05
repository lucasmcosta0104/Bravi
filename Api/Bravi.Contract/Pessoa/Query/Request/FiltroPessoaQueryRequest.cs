using Bravi.Contract.Pessoa.Query.Response;
using Bravi.Domain.Generico.Filter;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Bravi.Contract.Pessoa.Query.Request
{
    public class FiltroPessoaQueryRequest : IRequest<FiltroPessoaQueryResponse>
    {
        public ModelFilter modelFilter { get; set; }
    }
}
