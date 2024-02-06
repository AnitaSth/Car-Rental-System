using CRS_API.Models.Domain;

namespace CRS_API.Models.DTO
{
	public class RentalDto
	{
		public Guid Id { get; set; }
		public Guid UserId { get; set; }
		public Guid CarId { get; set; }
		public DateTime StartDate { get; set; }
		public DateTime EndDate { get; set; }
		public int Duration { get; set; }
		public int TotalCost { get; set; }


		public UserDto User { get; set; }
		public CarResponseDto Car { get; set; }
		public PaymentDto Payment { get; set; }
	}
}

