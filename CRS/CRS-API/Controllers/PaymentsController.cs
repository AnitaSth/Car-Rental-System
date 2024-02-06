using Microsoft.AspNetCore.Mvc;
using System.Text;
using Newtonsoft.Json;
using CRS_API.Models.DTO;
using CRS_API.Enums;
using Microsoft.AspNetCore.Authorization;
using CRS_API.Models.Domain;
using CRS_API.DB;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace CRS_API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class PaymentsController : ControllerBase
	{
		private readonly CRSDbContext _db;
		private readonly IMapper mapper;

		public PaymentsController(CRSDbContext _db, IMapper mapper)
        {
			this._db = _db;
			this.mapper = mapper;
		}

		[HttpGet]
		[Authorize(Roles = "Admin")]
		public async Task<IActionResult> GetAll()
		{
			var paymentDomain = await _db.Payment.Include("User").ToListAsync();

			var paymentDto = mapper.Map<List<PaymentDto>>(paymentDomain);

			return Ok(paymentDto);
		}

        [HttpPost]
		[Authorize]
		public async Task<IActionResult> Pay([FromBody] PaymentRequestDto paymentRequestDto)
		{
			if ((PaymentMethod)Enum.Parse(typeof (PaymentMethod), paymentRequestDto.PaymentMethod) == PaymentMethod.Cash)
			{
				var payment = new Payment
				{
					UserId = paymentRequestDto.UserId,
					RentalId = paymentRequestDto.RentalId,
					PaymentAmount = paymentRequestDto.PaymentAmount,
					PaymentMethod = (PaymentMethod)Enum.Parse(typeof(PaymentMethod), paymentRequestDto.PaymentMethod)
				};

				await _db.Payment.AddAsync(payment);
				await _db.SaveChangesAsync();

				var paymentDto = mapper.Map<Payment>(payment);
				return Ok(paymentDto);
			} 
			else if ((PaymentMethod)Enum.Parse(typeof(PaymentMethod), paymentRequestDto.PaymentMethod) == PaymentMethod.Khalti) 
			{
				var paymentPayload = new PaymentPayloadDto
				{
					return_url = paymentRequestDto.return_url,
					website_url = paymentRequestDto.website_url,
					amount = paymentRequestDto.amount,
					purchase_order_id = paymentRequestDto.purchase_order_id,
					purchase_order_name = paymentRequestDto.purchase_order_name,
					customer_info = paymentRequestDto.customer_info,
					product_details = paymentRequestDto.product_details,
				};

				var url = "https://a.khalti.com/api/v2/epayment/initiate/";
				var jsonPayload = JsonConvert.SerializeObject(paymentPayload);
				var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

				var client = new HttpClient();
				client.DefaultRequestHeaders.Add("Authorization", "key 1715387012d54b76a2bca18ec569b45a");

				var response = await client.PostAsync(url, content);


				if (response.IsSuccessStatusCode)
				{
					var responseContent = await response.Content.ReadAsStringAsync();

					var khaltiApiResponse = JsonConvert.DeserializeObject<DataDto>(responseContent);



					var paymentResponseDto = new PaymentResponseDto
					{
						success = true,
						data = new DataDto
						{
							pidx = khaltiApiResponse.pidx,
							payment_url = khaltiApiResponse.payment_url,
							expires_at = khaltiApiResponse.expires_at,
							expires_in = khaltiApiResponse.expires_in
						},
						message = "Payment is successful."
					};

					var payment = new Payment
					{
						UserId = paymentRequestDto.UserId,
						RentalId = paymentRequestDto.RentalId,
						PaymentAmount = paymentRequestDto.PaymentAmount,
						Status = PaymentStatus.Successful,
						PaymentMethod = (PaymentMethod)Enum.Parse(typeof(PaymentMethod), paymentRequestDto.PaymentMethod),
						PaymentDate = DateTime.Now,
					};

					await _db.Payment.AddAsync(payment);
					await _db.SaveChangesAsync();


					return Ok(paymentResponseDto);
				}
				else
				{
					var paymentResponseDto = new PaymentResponseDto
					{
						success = false,
						message = "Something went wrong"
					};

					var payment = new Payment
					{
						UserId = paymentRequestDto.UserId,
						RentalId = paymentRequestDto.RentalId,
						PaymentAmount = paymentRequestDto.PaymentAmount,
						Status = PaymentStatus.Failed,
						PaymentMethod = (PaymentMethod)Enum.Parse(typeof(PaymentMethod), paymentRequestDto.PaymentMethod),
					};

					await _db.Payment.AddAsync(payment);
					await _db.SaveChangesAsync();

					return BadRequest(paymentResponseDto);
				}

			} 
			else
			{
				return BadRequest();
			}

		}
	}
}
