namespace CRS_API.Models.DTO
{
	public class RentalRequestDto
	{
		public Guid UserId { get; set; }
		public Guid CarId { get; set; }
		public DateTime StartDate { get; set; }
		public DateTime EndDate { get; set; }
		public int TotalCost { get; set; }
	}
}
