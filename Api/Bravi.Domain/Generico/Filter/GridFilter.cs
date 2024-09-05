namespace Bravi.Domain.Generico.Filter
{
    public class GridFilter<T>
    {
        public GridFilter(ICollection<T> items, int totalRegistro)
        {
            Data = items;
            TotalRecords = totalRegistro;
        }

        public ICollection<T> Data { get; set; }
        public int TotalRecords { get; set; }
    }
}
