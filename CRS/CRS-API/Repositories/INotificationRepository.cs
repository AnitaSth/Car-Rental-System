using CRS_API.Models.Domain;

namespace CRS_API.Repositories
{
	public interface INotificationRepository
	{
		Task<List<Notification>> GetAllAsync();
		Task<Notification> CreateAsync(Notification notification);
	}
}
