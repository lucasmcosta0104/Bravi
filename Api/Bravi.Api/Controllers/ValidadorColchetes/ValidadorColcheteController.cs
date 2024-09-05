using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics.CodeAnalysis;
using System.Net;

namespace Bravi.Api.Controllers.Pessoa
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ExcludeFromCodeCoverage]
    public class ValidadorColcheteController : Controller
    {
        [HttpPost("Validar")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public async Task<IActionResult> Validar([FromBody] string request)
        {
            return Ok(ValidaColchete(request));
        }

        public static bool ValidaColchete(string inputEntrada)
        {
            Dictionary<char, char> dicionario = new Dictionary<char, char>
            {
                { ')', '(' },
                { '}', '{' },
                { ']', '[' }
            };

            Stack<char> pilha = new Stack<char>();

            foreach (char item in inputEntrada)
            {
                if (dicionario.ContainsValue(item))
                {
                    pilha.Push(item);
                }
                else if (dicionario.ContainsKey(item))
                {
                    if (pilha.Count == 0 || pilha.Pop() != dicionario[item])
                    {
                        return false;
                    }
                }
                else
                {
                    return false;
                }
            }

            return pilha.Count == 0;
        }
    }
}
