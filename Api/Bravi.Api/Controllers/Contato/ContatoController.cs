using Bravi.Contract.Contato.Command.Request;
using Bravi.Contract.Contato.Query.Request;
using Bravi.Contract.Contato.Query.Response;
using Bravi.Controllers;
using Bravi.Helper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics.CodeAnalysis;
using System.Net;

namespace Bravi.Api.Controllers.Contato
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ExcludeFromCodeCoverage]
    public class ContatoController : BaseController
    {
        public ContatoController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet("{Id}")]
        [ProducesResponseType(typeof(ObterContatoQueryResponse), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<IActionResult> ObterContato([FromRoute] ObterContatoQueryRequest request)
        {
            var response = await _mediator.Send(request);
            if (response == null)
                return NotFound();

            return CustomResponse(response.ContatoDto);
        }

        [HttpPost("Filter/{IdPessoa}")]
        [ProducesResponseType(typeof(ListaContatoQueryResponse), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<IActionResult> FiltroContato(Guid IdPessoa, [FromBody] ListaContatoQueryRequest request)
        {
            request.DefinirId(IdPessoa);
            var response = await _mediator.Send(request);

            if (response == null)
                return NotFound();

            return Ok(response.Itens);
        }

        [HttpPost("Filter")]
        [ProducesResponseType(typeof(ListaContatoQueryResponse), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<IActionResult> FiltroContato([FromBody] ListaContatoQueryRequest request)
        {
            var response = await _mediator.Send(request);

            if (response == null)
                return NotFound();

            return Ok(response.Itens);
        }

        [HttpPost]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public async Task<IActionResult> IncluirContato([FromBody] IncluirContatoCommandRequest request)
        {
            await _mediator.Send(request);

            return CustomResponse(Mensagens.RegistroSalvo);
        }

        [HttpPut("{id}")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<IActionResult> AlterarContato(Guid id, [FromBody] AlterarContatoCommandRequest request)
        {
            request.DefinirId(id);
            await _mediator.Send(request);

            return CustomResponse(Mensagens.RegistroAtualizado);
        }

        [HttpDelete("{Id}")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<IActionResult> ExcluirContato(ExcluirContatoCommandRequest request)
        {
            await _mediator.Send(request);

            return CustomResponse(Mensagens.RegistroExcluido);
        }
    }
}
