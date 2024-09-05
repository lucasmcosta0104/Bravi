using Bravi.Configuration.Mapper.Pessoa;
using Bravi.Mapper.Endereco;
using Microsoft.Extensions.DependencyInjection;

namespace Bravi.Configuration
{
    public static class MapperInitialize
    {
        public static void Initialize(IServiceCollection service)
        {

            service.AddAutoMapper(typeof(PessoaProfile));
            service.AddAutoMapper(typeof(ContatoProfile));
        }
    }
}
