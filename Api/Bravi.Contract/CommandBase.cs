using Microsoft.AspNetCore.Mvc;

namespace Bravi.Contract
{
    public class CommandBase
    {
        [FromRoute]
        public Guid Id { get; private set; }

        public void DefinirId(Guid id)
        {
            Id = id;
        }
    }
}
