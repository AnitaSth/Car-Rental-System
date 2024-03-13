namespace CRS_API.Models.DTO
{
	public class NotificationRequestDto
	{
		public string Title { get; set; }
		public string Description { get; set; }
		public Guid UserId { get; set; }
	}
}
