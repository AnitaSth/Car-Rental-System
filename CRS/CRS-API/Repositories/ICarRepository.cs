using CRS_API.Models.Domain;

namespace CRS_API.Repositories
{
	public interface ICarRepository
	{
		Task<List<Car>> GetAllAsync();

		Task<List<Car>> GetCRSCarsAsync();

		Task<List<Car>> GetThirdPartyCarsAsync();

		Task<Car?> GetByIdAsync(Guid id);

		Task<Car> CreateAsync(Car car);

		Task<Car?> UpdateAsync(Guid id, Car car);

		Task<Car?> DeleteAsync(Guid id);
	}
}
