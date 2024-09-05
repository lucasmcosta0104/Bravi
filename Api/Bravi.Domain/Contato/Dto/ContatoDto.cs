namespace Bravi.Domain.Contato.Dto
{
    public class ContatoDto
    {
        public Guid Id { get; set; }
        public string Nome { get; set; }

        public string Telefone { get; set; }

        public string WhatsApp { get; set; }

        public string Email { get; set; }
        public Guid PessoaId { get; set; }
        public DateTime DataCriacao { get; set; }
    }
}
