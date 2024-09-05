using Bravi.Domain.Pessoa.Entities;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Bravi.Domain.Contato.Entities
{
    public class ContatoEntity : BaseEntity
    {
        [MaxLength(100)]
        public string Nome { get; set; }
        [MaxLength(15)]
        public string Telefone { get; set; }
        [MaxLength(15)]
        public string WhatsApp { get; set; }
        [MaxLength(50)]
        public string Email { get; set; }
        public Guid PessoaId { get; set; }
        [JsonIgnore]
        public virtual PessoaEntity Pessoa { get; set; }
    }
}
