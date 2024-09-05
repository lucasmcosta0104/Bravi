using Bravi.Domain.Contato.Dto;
using Bravi.Domain.Generico.Filter;

namespace Bravi.Contract.Contato.Query.Response
{
    public class ListaContatoQueryResponse
    {
        public GridFilter<ContatoDto> Itens { get; set; }
    }
}
