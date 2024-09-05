using AutoMapper;
using Bravi.Domain.Generico.Enum;
using Bravi.Domain.Pessoa.Entities;
using Bravi.Infrastructure.Pessoa;

namespace Bravi.Worker.Pessoa
{
    public class PessoaService : IPessoaService
    {
        private readonly IPessoaRepository _pessoaRepository;
        private readonly ILogger<PessoaService> _logger;
        private readonly IMapper _mapper;

        public PessoaService(IPessoaRepository pessoaRepository, ILogger<PessoaService> logger, IMapper mapper)
        {
            _pessoaRepository = pessoaRepository;
            _logger = logger;
            _mapper = mapper;
        }

        public async Task ExcluirPessoaAsync(Guid id, CancellationToken cancellationToken)
        {
            var pessoa = await _pessoaRepository.ObterPessoaAsync(id, cancellationToken);

            if (pessoa == null)
            {
                _logger.LogInformation("Não existe pessoa com esse id informado");
                throw new Exception("Não existe pessoa com esse id informado");
            }
                
            pessoa.Status = StatusEnum.Excluir;

            await _pessoaRepository.EditarPessoaAsync(pessoa, cancellationToken);
        }

        public async Task AdicionarPessoaAsync(PessoaEntity pessoa, CancellationToken cancellationToken)
        {
            await _pessoaRepository.AdicionarPessoaAsync(pessoa, cancellationToken);
        }

        public async Task AlterarPessoaAsync(PessoaEntity pessoa, CancellationToken cancellationToken)
        {
            await _pessoaRepository.EditarPessoaAsync(pessoa, cancellationToken);
        }

        public async Task<PessoaEntity> ObterPessoaAsync(Guid id, CancellationToken cancellationToken)
        {
            return await _pessoaRepository.ObterPessoaAsync(id, cancellationToken);
        }
    }
}
