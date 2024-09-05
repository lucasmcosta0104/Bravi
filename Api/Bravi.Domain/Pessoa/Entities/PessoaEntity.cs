using Bravi.Domain.Contato.Entities;
using Bravi.Domain.Pessoa.Enum;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Bravi.Domain.Pessoa.Entities
{
    public class PessoaEntity : BaseEntity
    {
        [MaxLength(100)]
        public string Nome { get; set; }
        public TipoPessoaEnum TipoPessoa { get; set; }
        [MaxLength(18)]
        public string Documento { get; set; }
        [MaxLength(15)]
        public string Telefone { get; set; }
        [MaxLength(50)]
        public string Email { get; set; }

        [JsonIgnore]
        public virtual ICollection<ContatoEntity> Contatos { get; set; }
    }
}
