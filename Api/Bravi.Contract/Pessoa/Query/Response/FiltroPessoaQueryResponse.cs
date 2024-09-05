using Bravi.Domain.Generico.Filter;
using Bravi.Domain.Pessoa.Dto;

namespace Bravi.Contract.Pessoa.Query.Response
{
    public class FiltroPessoaQueryResponse
    {
        public GridFilter<FiltroPessoaDto> Item { get; set; }
    }
}
