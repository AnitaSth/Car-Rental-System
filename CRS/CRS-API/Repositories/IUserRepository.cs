using CRS_API.Models.Domain;

namespace CRS_API.Interfaces
{
	public interface IUserRepository
	{
		Task<User> GetCurrentUserAsync(string currentUserId);

		Task<List<User>> GetAllAsync();

		Task<User?> DeleteAsync(Guid id);
	}
}
