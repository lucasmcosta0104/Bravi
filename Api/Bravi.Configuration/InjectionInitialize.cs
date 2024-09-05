using Bravi.Domain.Generico.ValidateRequest;
using Bravi.Infrastructure.Contato;
using Bravi.Infrastructure.Pessoa;
using Bravi.Worker.Contato;
using Bravi.Worker.Pessoa;
using Microsoft.Extensions.DependencyInjection;

namespace Bravi.Configuration
{
    public static class InjectionInitialize
    {
        public static void Initialize(IServiceCollection service)
        {
            service.AddLogging();

            service.AddScoped<IPessoaService, PessoaService>();
            service.AddScoped<IContatoService, ContatoService>();
            service.AddScoped<IPessoaRepository, PessoaRepository>();
            service.AddScoped<IContatoRepository, ContatoRepository>();
            service.AddScoped<IValidate, Validate>();
        }
    }
}