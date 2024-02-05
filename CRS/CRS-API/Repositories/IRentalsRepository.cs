using CRS_API.Models.Domain;
using CRS_API.Models.DTO;

namespace CRS_API.Repositories
{
	public interface IRentalsRepository
	{
		Task<List<Rental>> GetAll();

		Task<List<Rental>> GetAsync(string currentUserId);

		Task<Rental> CreateAsync(Rental rental);
	}
}
