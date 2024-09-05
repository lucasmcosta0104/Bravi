using AutoMapper;
using Bravi.Contract.Contato.Command.Request;
using Bravi.Domain.Contato.Entities;

namespace Bravi.Mapper.Endereco
{
    public class ContatoProfile : Profile
    {
        public ContatoProfile()
        {
            CreateMap<IncluirContatoCommandRequest, ContatoEntity>();
            CreateMap<AlterarContatoCommandRequest, ContatoEntity>();
        }
    }
}
