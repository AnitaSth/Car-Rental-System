using CRS_API.Enums;

namespace CRS_API.Models.DTO
{
	public class PaymentRequestDto : PaymentPayloadDto
	{
		public Guid UserId { get; set; }
		public Guid RentalId { get; set; }
		public int PaymentAmount { get; set; }
		public string Status { get; set; } = PaymentStatus.Pending.ToString();
		public string PaymentMethod { get; set; }
		public DateTime? PaymentDate { get; set; }
	}
}
