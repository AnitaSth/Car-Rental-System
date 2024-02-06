
using CRS_API.Models.Domain;

namespace CRS_API.Models.DTO
{
	public class CustomerInfoDto
	{
		public string name { get; set; }

		public string email { get; set; }

		public string phone { get; set; }
	}

	public class ProductDetailsDto
	{
		public string identity { get; set; }

		public string name { get; set; }

		public int total_price { get; set; }

		public int quantity { get; set; }

		public int unit_price { get; set; }
	}

	public class PaymentPayloadDto
	{
		public string? return_url { get; set; }

		public string? website_url { get; set; }

		public int? amount { get; set; }

		public string? purchase_order_id { get; set; }

		public string? purchase_order_name { get; set; }

		public CustomerInfoDto? customer_info { get; set; }

		public List<ProductDetailsDto>? product_details { get; set; } = null;
	}
}
