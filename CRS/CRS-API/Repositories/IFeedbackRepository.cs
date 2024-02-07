using CRS_API.Models.Domain;

namespace CRS_API.Repositories
{
	public interface IFeedbackRepository
	{
		Task<List<Feedback>> GetAllAsync();
		Task<Feedback> CreateAsync(Feedback feedback);
	}
}
