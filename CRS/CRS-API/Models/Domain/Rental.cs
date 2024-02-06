namespace CRS_API.Models.Domain
{
	public class Rental
	{
		public Guid Id { get; set; }
		public Guid UserId { get; set; }
		public Guid CarId { get; set; }	
		public DateTime StartDate { get; set; }
		public DateTime EndDate { get; set; }
		public int Duration { get; set; }
		public int TotalCost { get; set; }

		public User User { get; set; }	
		public Car Car { get; set; }

		public Payment Payment { get; set; }
	}
}
