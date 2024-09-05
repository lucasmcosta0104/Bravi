namespace Bravi.Infrastructure
{
    public class BaseRepository
    {
        internal ApplicationDbContext _context { get; set; }

        public BaseRepository(ApplicationDbContext context)
        {
            _context = context;
        }
    }
}
