using Microsoft.AspNetCore.Mvc;
using MediatR;

namespace Bravi.Controllers
{
    public class BaseController : ControllerBase
    {
        protected readonly IMediator _mediator;

        public BaseController(IMediator mediator)
        {
            _mediator = mediator;
        }

        protected ActionResult CustomResponse(object? result = null, bool sucesso = true)
        {
            if (sucesso)
            {
                return Ok(new
                {
                    success = true,
                    data = result
                });
            }

            return BadRequest(new
            {
                success = false,
                errors = result
            });
        }
    }
}
