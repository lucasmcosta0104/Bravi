using Bravi.Domain.Generico.Enum;

namespace Bravi.Domain
{
    public class BaseEntity
    {
        public Guid Id { get; set; }
        public string UsuarioCriacao { get; set; }
        public string UsuarioAlteracao { get; set; }
        public DateTime DataCriacao { get; set; } = DateTime.UtcNow;
        public DateTime DataAlteracao { get; set; } = DateTime.UtcNow;
        public StatusEnum Status { get; set; } = StatusEnum.Ativo;
    }
}