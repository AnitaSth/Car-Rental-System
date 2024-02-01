using CRS_API.Enums;


namespace CRS_API.Models.Domain
{
	public class User
	{
		public Guid Id { get; set; }
		public string PhoneNumber { get; set; } = string.Empty;
		public string PasswordHash { get; set; } = string.Empty;
		public string FullName { get; set; } = string.Empty;
		public UserRole Role { get; set; }
		public ICollection<Rental> Rentals { get; } = new List<Rental>();
		public ICollection<Feedback> Feedbacks { get; } = new List<Feedback>();
	}
}
