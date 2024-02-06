using CRS_API.Enums;

namespace CRS_API.Models.DTO
{
	public class UserDto
	{
		public Guid Id { get; set; }
		public string PhoneNumber { get; set; } 
		public string FullName { get; set; }
		public string Role { get; set; }
	}
}
