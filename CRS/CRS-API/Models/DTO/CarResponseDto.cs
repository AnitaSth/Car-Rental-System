namespace CRS_API.Models.DTO
{
	public class CarResponseDto
	{
		public Guid Id { get; set; }
		public string Manufacturer { get; set; } = string.Empty;
		public string Model { get; set; } = string.Empty;
	}
}
