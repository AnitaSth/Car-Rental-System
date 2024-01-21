using CRS_API.Enums;

namespace CRS_API.Models.DTO
{
	public class CarDto
	{
		public int Id { get; set; }
		public string Manufacturer { get; set; } = string.Empty;
		public string Model { get; set; } = string.Empty;
		public string LicensePlate { get; set; } = string.Empty;
		public string Color { get; set; } = string.Empty;
		public string FuelType { get; set; }
		public string TransmissionType { get; set; }
		public float Mileage { get; set; }
		public int PassengerSeat { get; set; }
		public int RentalPrice { get; set; }
		public string Condition { get; set; }
		public string Image { get; set; }
		public bool Availability { get; set; } = true;
	}
}
