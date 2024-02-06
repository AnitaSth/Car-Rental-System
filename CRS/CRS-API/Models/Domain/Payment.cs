using CRS_API.Enums;

namespace CRS_API.Models.Domain
{
	public class Payment
	{
		public Guid Id { get; set; }
		public Guid UserId { get; set; }
		public Guid RentalId { get; set; }
		public int PaymentAmount { get; set; }
		public PaymentStatus Status { get; set; } = PaymentStatus.Pending;
		public PaymentMethod PaymentMethod { get; set; }
		public DateTime? PaymentDate { get; set; }

		public User User { get; set; }
		public Rental Rental { get; set; }
	}
}
