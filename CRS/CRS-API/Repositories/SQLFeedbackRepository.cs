using CRS_API.DB;
using CRS_API.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace CRS_API.Repositories
{
	public class SQLFeedbackRepository : IFeedbackRepository
	{
		private readonly CRSDbContext _db;

		public SQLFeedbackRepository(CRSDbContext _db)
        {
			this._db = _db;
		}

		public async Task<List<Feedback>> GetAllAsync()
		{
			return await _db.Feedbacks.Include("User").Include("Car").ToListAsync();
		}



		public async Task<Feedback> CreateAsync(Feedback feedback)
		{
			await _db.Feedbacks.AddAsync(feedback);
			await _db.SaveChangesAsync();

			return feedback;
		}

		public async Task<List<Feedback>> GetByCarIdAsync(Guid carId)
		{
			return await _db.Feedbacks.Include("User").Include("Car").Where(x => x.CarId == carId).ToListAsync(); 
		}
	}
}
