namespace Bravi.Domain.Generico.Filter
{
    public class ModelFilter
    {
        public int page { get; set; } = 1;
        public int pageSize { get; set; } = 10;
        public string orderBy { get; set; } = "Id";
        public string orderDirection { get; set; } = "asc";
        public List<Filtro> CamposFiltro { get; set; } = new List<Filtro>();
    }

    public class Filtro
    {
        public string Propriedade { get; set; }
        public string Valor { get; set; }
        public string Tipo { get; set; }
        public bool IsIgual { get; set; }
    }
}
