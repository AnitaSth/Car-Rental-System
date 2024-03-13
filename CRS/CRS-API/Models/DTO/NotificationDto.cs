namespace CRS_API.Models.DTO
{
	public class NotificationDto
	{
		public Guid Id {  get; set; }
		public string Title { get; set; }	
		public string Description { get; set; }	
		public Guid UserId { get; set; }	
		public UserDto User { get; set; }
	}
}
