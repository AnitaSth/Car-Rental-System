namespace CRS_API.Models.Domain
{
	public class Feedback
	{
		public Guid Id { get; set; }
		public float Rating { get; set; }
		public String Description { get; set; }
		public Guid UserId { get; set; }	
		public Guid CarId { get; set; }

		public User User { get; set; }	
		public Car Car { get; set; }	
	}
}
