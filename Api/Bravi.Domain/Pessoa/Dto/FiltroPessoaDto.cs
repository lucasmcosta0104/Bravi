namespace Bravi.Domain.Pessoa.Dto
{
    public class FiltroPessoaDto
    {
        public Guid Id { get; set; }
        public string Nome { get; set; }        
        public string Documento { get; set; }        
        public string NomeFantasia { get; set; }       
        public string Telefone { get; set; }        
        public string Email { get; set; }        
        public string InscricaoMunicipal { get; set; }        
        public string InscricaoEstadual { get; set; }
        public int TipoPessoa { get; set; }
        public DateTime DataCriacao { get; set; }        
    }
}
