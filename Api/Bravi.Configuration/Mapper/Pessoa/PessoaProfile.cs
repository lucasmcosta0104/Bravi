using AutoMapper;
using Bravi.Contract.Pessoa.Command.Request;
using Bravi.Contract.Pessoa.Query.Response;
using Bravi.Domain.Generico.Enum;
using Bravi.Domain.Pessoa.Dto;
using Bravi.Domain.Pessoa.Entities;
using Bravi.Domain.Pessoa.Enum;


namespace Bravi.Configuration.Mapper.Pessoa
{
    public class PessoaProfile : Profile
    {
        public PessoaProfile()
        {
            CreateMap<ObterPessoaDto, ObterPessoaQueryResponse>();

            CreateMap<IncluirPessoaCommandRequest, PessoaEntity>()
                .ForMember(x => x.TipoPessoa, e => e.MapFrom(opt => opt.Documento.Length > 14 ? TipoPessoaEnum.Juridica : TipoPessoaEnum.Fisica))
                .ForMember(x => x.Status, e => e.MapFrom(opt => StatusEnum.Ativo))
                .ForMember(x => x.DataAlteracao, e => e.MapFrom(opt => DateTime.UtcNow))
                .ForMember(x => x.DataCriacao, e => e.MapFrom(opt => DateTime.UtcNow));

            CreateMap<AlterarPessoaCommandRequest, PessoaEntity>()
                .ForMember(x => x.DataAlteracao, e => e.MapFrom(opt => DateTime.UtcNow));
        }
    }
}
