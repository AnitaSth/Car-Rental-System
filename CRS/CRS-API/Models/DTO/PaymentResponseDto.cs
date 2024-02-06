namespace CRS_API.Models.DTO
{
	public class DataDto
	{
		public string pidx { get; set; }
		public string payment_url { get; set; }
		public DateTime expires_at { get; set; }
		public int expires_in {  get; set; }
	}

	public class PaymentResponseDto
	{
		public bool success { get; set; }	
		public DataDto? data { get; set; }
		public string? message { get; set; }	
	}
}
