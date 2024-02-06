using CRS_API.Enums;
using CRS_API.Models.Domain;

namespace CRS_API.Models.DTO
{
	public class PaymentDto
	{
		public Guid Id { get; set; }
		public Guid UserId { get; set; }
		public Guid RentalId { get; set; }
		public int PaymentAmount { get; set; }
		public string Status { get; set; }
		public string PaymentMethod { get; set; }
		public DateTime? PaymentDate { get; set; }

		public UserDto User { get; set; }
	}
}
