using Bravi.Contract.Pessoa.Command.Request;
using Bravi.Contract.Pessoa.Query.Request;
using Bravi.Contract.Pessoa.Query.Response;
using Bravi.Controllers;
using Bravi.Helper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics.CodeAnalysis;
using System.Net;

namespace Bravi.Api.Controllers.Pessoa
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ExcludeFromCodeCoverage]
    public class PessoaController : BaseController
    {
        public PessoaController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet("{Id}")]
        [ProducesResponseType(typeof(ObterPessoaQueryResponse), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<IActionResult> ObtBraviessoa(ObterPessoaQueryRequest request)
        {
            var response = await _mediator.Send(request);

            if (response == null)
                return NotFound();

            return CustomResponse(response);
        }

        [HttpPost("Filter")]
        [ProducesResponseType(typeof(FiltroPessoaQueryResponse), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<IActionResult> FiltroPessoa([FromBody]FiltroPessoaQueryRequest request)
        {
            var response = await _mediator.Send(request);

            return Ok(response.Item);
        }

        [HttpPost]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public async Task<IActionResult> IncluirPessoa([FromBody] IncluirPessoaCommandRequest request)
        {
            await _mediator.Send(request);

            return CustomResponse(Mensagens.RegistroSalvo);
        }

        [HttpPut("{id}")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<IActionResult> AlterarPessoa(Guid id, [FromBody] AlterarPessoaCommandRequest request)
        {
            request.DefinirId(id);
            await _mediator.Send(request);

            return CustomResponse(Mensagens.RegistroAtualizado);
        }

        [HttpDelete("{Id}")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<IActionResult> ExcluirPessoa(ExcluirPessoaCommandRequest request)
        {
            await _mediator.Send(request);

            return CustomResponse(Mensagens.RegistroExcluido);
        }
    }
}
