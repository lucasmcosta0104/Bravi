namespace Bravi.Domain.Generico.ValidateRequest
{
    public interface IValidate
    {
        void Validar(bool invalido, string mensagem);
    }
}