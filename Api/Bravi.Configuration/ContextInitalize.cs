using Bravi.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Bravi.Configuration
{
    public static class ContextInitalize
    {
        public static void Initialize(IServiceCollection service, string connectionString)
        {
            service.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlite(connectionString, b => b.MigrationsAssembly("Bravi.Api")));
        }
    }
}
