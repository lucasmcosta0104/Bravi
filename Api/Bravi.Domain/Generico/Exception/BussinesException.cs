namespace Bravi.Domain.Generico.ExceptionBussines
{
    public class BussinesException : Exception
    {
        public BussinesException(string message, Exception innerException) : base(message, innerException)
        {
        }

        public BussinesException(string message) : base(message)
        {
        }
    }
}
