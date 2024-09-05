using MediatR;

namespace Bravi.Contract.Contato.Command.Request
{
    public class AlterarContatoCommandRequest : CommandBase, IRequest
    {
        public string Nome { get; set; }
        public string Telefone { get; set; }
        public string WhatsApp { get; set; }
        public string Email { get; set; }
        public Guid PessoaId { get; set; }
    }
}
