using CRS_API.DB;
using CRS_API.Models.Domain;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace CRS_API.Interfaces
{
	public class SQLUserRepository : IUserRepository
	{
		private readonly CRSDbContext _db;

		public SQLUserRepository(CRSDbContext _db)
		{
			this._db = _db;
		}

		public async Task<User> GetCurrentUserAsync(string currentUserId)
		{
			if (currentUserId != null)
			{
				return await _db.Users.FirstOrDefaultAsync(u => u.Id == Guid.Parse(currentUserId));
			}

			return null;
		}

		public async Task<List<User>> GetAllAsync()
		{
			return await _db.Users.ToListAsync();
		}

		public async Task<User?> DeleteAsync(Guid id)
		{
			var existingUser = await _db.Users.FirstOrDefaultAsync(x => x.Id == id);

			if (existingUser == null)
			{
				return null;
			}

			_db.Users.Remove(existingUser);
			await _db.SaveChangesAsync();
			return existingUser;
		}

	}
}
