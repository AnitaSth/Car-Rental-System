using CRS_API.Enums;
using CRS_API.Models.Domain;

namespace CRS_API.Models.DTO
{
	public class CarDto
	{
		public Guid Id { get; set; }
		public string Manufacturer { get; set; } = string.Empty;
		public string Model { get; set; } = string.Empty;
		public string LicensePlate { get; set; } = string.Empty;
		public string Color { get; set; } = string.Empty;
		public string FuelType { get; set; } = string.Empty;
		public string TransmissionType { get; set; } = string.Empty;
		public float Mileage { get; set; }
		public int PassengerSeat { get; set; }
		public int RentalPrice { get; set; }
		public string Condition { get; set; } = string.Empty;
		public string Image { get; set; } = string.Empty;
		public bool Availability { get; set; } = true;
		public UserDto User { get; set; }

		public ICollection<FeedbackDto> Feedbacks { get; } = new List<FeedbackDto>();
	}
}
