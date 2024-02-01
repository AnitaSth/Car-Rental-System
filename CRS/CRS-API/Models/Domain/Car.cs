using CRS_API.Enums;
using Microsoft.EntityFrameworkCore;

namespace CRS_API.Models.Domain
{
	public class Car
	{
		public Guid Id { get; set; }
		public string Manufacturer { get; set; } = string.Empty;
		public string Model { get; set; } = string.Empty;
		public string LicensePlate { get; set; } = string.Empty;
		public string Color { get; set; } = string.Empty;
		public FuelType FuelType { get; set; }
		public TransmissionType TransmissionType { get; set; }
		public float Mileage { get; set; }
		public int PassengerSeat { get; set; }
		public int RentalPrice { get; set; }
		public Condition Condition { get; set; }
		public string Image { get; set; }
		public bool Availability { get; set; } = true;
		public Guid UserId { get; set; }

		public User User { get; set; }

		public ICollection<Feedback> Feedbacks { get; } = new List<Feedback>();
	}
}
