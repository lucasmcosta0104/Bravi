using FluentValidation.Results;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Serialization;

namespace Bravi.Contract
{
    public class CommandValidation : IRequest<ValidationResult>
    {
        [FromRoute]
        public Guid Id { get; private set; }

        [JsonIgnore]
        public ValidationResult? ValidationResult { get; set; }

        public void DefinirId(Guid id)
        {
            Id = id;
        }
        public virtual bool EhValido()
        {
            throw new NotImplementedException();
        }
    }
}
