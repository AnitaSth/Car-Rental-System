using CRS_API.Models.Domain;

namespace CRS_API.Models.DTO
{
	public class RentalDto
	{
		public Guid Id { get; set; }
		public Guid UserId { get; set; }
		public Guid CarId { get; set; }
		public DateTime StartDate { get; set; }
		public DateTime EndDate { get; set; }
		public int TotalCost { get; set; }


		public UserDto User { get; set; }
		public CarResponseDto Car { get; set; }
	}
}

/*{
	"userId": "e7a70e63-cd75-4507-d145-08dc1fc15097",
  "carId": "8096a4a8-4d47-484d-0dd2-08dc1e4b30ea",
  "startDate": "2024-01-28T05:42:22.358Z",
  "endDate": "2024-01-29T05:42:22.358Z",
  "totalCost": 2500
}*/