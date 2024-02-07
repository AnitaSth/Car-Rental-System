using CRS_API.Models.Domain;

namespace CRS_API.Models.DTO
{
	public class FeedbackRequestDto
	{
		public float Rating { get; set; }
		public string Description { get; set; }
		public Guid UserId { get; set; }
		public Guid CarId { get; set; }
	}
}
