using CRS_API.DB;
using CRS_API.Models.Domain;
using CRS_API.Models.DTO;
using Microsoft.EntityFrameworkCore;

namespace CRS_API.Repositories
{
	public class SQLRentalsRepository : IRentalsRepository
	{
		private readonly CRSDbContext _db;

		public SQLRentalsRepository(CRSDbContext _db)
        {
			this._db = _db;
		}

		public async Task<List<Rental>> GetAll()
		{
			return await _db.Rentals.Include("User").Include("Car").Include("Payment").ToListAsync();
		}

		public async Task<List<Rental>> GetAsync(string currentUserId)
		{
			return await _db.Rentals.Where(r => r.UserId == Guid.Parse(currentUserId)).Include("User").Include("Car").Include("Payment").ToListAsync();
		}

		public async Task<Rental> CreateAsync (Rental rental)
		{
			await _db.Rentals.AddAsync(rental);
			await _db.SaveChangesAsync();
			return rental;
		}
	}
}
