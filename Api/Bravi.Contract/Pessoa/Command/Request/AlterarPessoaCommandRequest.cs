using MediatR;

namespace Bravi.Contract.Pessoa.Command.Request
{
    public class AlterarPessoaCommandRequest : CommandBase, IRequest
    {
        public string Nome { get; set; }
        public string Documento { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
        public string NomeFantasia { get; set; }
        public string InscricaoEstadual { get; set; }
        public string InscricaoMunicipal { get; set; }
        public string Observacoes { get; set; }
    }
}
