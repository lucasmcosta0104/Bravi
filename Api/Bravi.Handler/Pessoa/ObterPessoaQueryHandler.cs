using AutoMapper;
using Bravi.Contract.Pessoa.Query.Request;
using Bravi.Contract.Pessoa.Query.Response;
using Bravi.Domain.Generico.ExceptionBussines;
using Bravi.Domain.Generico.ValidateRequest;
using Bravi.Infrastructure.Pessoa;
using MediatR;
using Microsoft.Extensions.Logging;
namespace Bravi.Handler.Pessoa
{
    public class ObterPessoaQueryHandler : IRequestHandler<ObterPessoaQueryRequest, ObterPessoaQueryResponse>
    {
        private readonly IPessoaRepository _pessoaRepository;
        private readonly ILogger<ObterPessoaQueryHandler> _logger;
        private readonly IValidate _validate;
        private readonly IMapper _mapper;

        public ObterPessoaQueryHandler(IPessoaRepository pessoaRepository, ILogger<ObterPessoaQueryHandler> logger, IValidate validate, IMapper mapper)
        {
            _pessoaRepository = pessoaRepository;
            _logger = logger;
            _validate = validate;
            _mapper = mapper;
        }

        public async Task<ObterPessoaQueryResponse> Handle(ObterPessoaQueryRequest request, CancellationToken cancellationToken)
        {
            try
            {
                _validate.Validar(Guid.Empty.Equals(request.Id), "Formato incorreto");
                var dto = await _pessoaRepository.ObtBraviessoaQueryAsync(request.Id, cancellationToken);

                if (dto == null)
                {
                    _logger.LogWarning("Pesasoa não encontrada");
                    return null;
                }
                    
                return _mapper.Map<ObterPessoaQueryResponse>(dto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                throw new BussinesException(ex.Message, ex);
            }
        }
    }
}
