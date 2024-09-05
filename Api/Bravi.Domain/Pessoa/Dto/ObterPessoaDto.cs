namespace Bravi.Domain.Pessoa.Dto
{
    public class ObterPessoaDto
    {
        public Guid Id { get; set; }
        public string Nome { get; set; }
        public string Documento { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
        public int TipoPessoa { get; set; }
        public DateTime? DataCriacao { get; set; }
    }
}
