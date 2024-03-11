using CRS_API.Enums;


namespace CRS_API.Models.Domain
{
	public class User
	{
		public Guid Id { get; set; }
		public string PhoneNumber { get; set; }
		public string PasswordHash { get; set; }
		public string FullName { get; set; }
		public UserRole Role { get; set; }
		public ICollection<Rental> Rentals { get; } = new List<Rental>();
		public ICollection<Feedback> Feedbacks { get; } = new List<Feedback>();
		public ICollection<Payment> Payments { get; } = new List<Payment>();

		public ICollection<Notification> Notifications { get; } = new List<Notification>();

	}
}
