using CRS_API.DB;
using CRS_API.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace CRS_API.Repositories
{
	public class SQLNotificationRepository : INotificationRepository
	{
        private readonly CRSDbContext _db;

        public SQLNotificationRepository(CRSDbContext _db)
        {
            this._db = _db;
        }

		public async Task<List<Notification>> GetAllAsync()
        {
            return await _db.Notification.Include("User").ToListAsync();
        }


		public async Task<Notification> CreateAsync(Notification notification)
		{
			await _db.Notification.AddAsync(notification);
			await _db.SaveChangesAsync();
			return notification;
		}

		public async Task<Notification> UpdateAsync(Guid id)
		{
			var existingNotification = await _db.Notification.FirstOrDefaultAsync(x => x.Id == id);

			if (existingNotification == null)
			{
				return null;
			}

			existingNotification.IsSeen = true;

			await _db.SaveChangesAsync();
			return existingNotification;
		}
	}
}
