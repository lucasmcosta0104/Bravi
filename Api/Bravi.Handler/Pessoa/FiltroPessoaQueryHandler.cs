using Bravi.Contract.Pessoa.Query.Request;
using Bravi.Contract.Pessoa.Query.Response;
using Bravi.Domain.Generico.ExceptionBussines;
using Bravi.Domain.Generico.ValidateRequest;
using Bravi.Domain.Pessoa.Dto;
using Bravi.Helper;
using Bravi.Infrastructure.Pessoa;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Bravi.Handler.Pessoa
{
    public class FiltroPessoaQueryHandler : IRequestHandler<FiltroPessoaQueryRequest, FiltroPessoaQueryResponse>
    {
        private readonly IPessoaRepository _pessoaRepository;
        private readonly ILogger<FiltroPessoaQueryHandler> _logger;
        private readonly IValidate _validate;

        public FiltroPessoaQueryHandler(IPessoaRepository pessoaRepository, ILogger<FiltroPessoaQueryHandler> logger, IValidate validate)
        {
            _pessoaRepository = pessoaRepository;
            _logger = logger;
            _validate = validate;
        }
        public async Task<FiltroPessoaQueryResponse> Handle(FiltroPessoaQueryRequest request, CancellationToken cancellationToken)
        {
            try
            {
                var query = await _pessoaRepository.ObtBraviessoaListAsync();
                var filtro = await HelperFilter<FiltroPessoaDto>.Filter(request.modelFilter, query, cancellationToken);

                return new FiltroPessoaQueryResponse
                {
                    Item = filtro,
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                throw new BussinesException(ex.Message, ex);
            }
        }
    }
}
