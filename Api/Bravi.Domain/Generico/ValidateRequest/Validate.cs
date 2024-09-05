using Bravi.Domain.Generico.ExceptionBussines;

namespace Bravi.Domain.Generico.ValidateRequest
{
    public class Validate : IValidate
    {
        public void Validar(bool invalido, string mensagem)
        {
            if(invalido)
            {
                throw new BussinesException(mensagem);
            }
        }
    }
}
