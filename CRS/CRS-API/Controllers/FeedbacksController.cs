using CRS_API.DB;
using CRS_API.Models.Domain;
using CRS_API.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRS_API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class FeedbacksController : ControllerBase
	{
		private readonly CRSDbContext _db;

		public FeedbacksController(CRSDbContext _db)
        {
			this._db = _db;
		}

		[HttpGet]
		[Authorize(Roles = "Admin")]
		public ActionResult<List<FeedbackDto>> GetAll()
		{
			List<Feedback> feedbacks = _db.Feedbacks.Include("User").Include("Car").ToList();

			List<FeedbackDto> feedbacksDto = new List<FeedbackDto>();

			foreach (var feedback in feedbacks)
			{
				feedbacksDto.Add(new FeedbackDto()
				{
					Id = feedback.Id,
					Rating = feedback.Rating,
					Description = feedback.Description,
					UserId = feedback.UserId,
					CarId = feedback.CarId,
					User = new UserDto
					{
						Id = feedback.User.Id,
						PhoneNumber = feedback.User.PhoneNumber,
						FullName = feedback.User.FullName,
						Role = feedback.User.Role.ToString(),
					},
					Car = new CarResponseDto
					{
						Id = feedback.Car.Id,
						Manufacturer = feedback.Car.Manufacturer,
						Model = feedback.Car.Model,
					}
				});
			}


			return Ok(feedbacksDto);
		}


		[HttpPost]
		[Authorize(Roles = "Admin, Customer, Vehicl")]
		public ActionResult<FeedbackDto> Create([FromBody] FeedbackRequestDto feedbackRequestDto) 
		{
			Feedback feedback = new Feedback
			{
				Rating = feedbackRequestDto.Rating,
				Description = feedbackRequestDto.Description,
				UserId = feedbackRequestDto.UserId,
				CarId = feedbackRequestDto.CarId,
			}; 

			_db.Add(feedback);
			_db.SaveChanges();

			feedback = _db.Feedbacks.Include("User").Include("Car").FirstOrDefault(f => f.Id == feedback.Id);

			FeedbackDto feedbackDto = new FeedbackDto
			{
				Id = feedback.Id,
				Rating = feedback.Rating,
				Description = feedback.Description,
				UserId = feedback.UserId,
				CarId = feedback.CarId,
				User = new UserDto
				{
					Id = feedback.User.Id,
					PhoneNumber = feedback.User.PhoneNumber,
					FullName = feedback.User.FullName,
					Role = feedback.User.Role.ToString(),
				},
				Car = new CarResponseDto
				{
					Id = feedback.Car.Id,
					Manufacturer = feedback.Car.Manufacturer,
					Model = feedback.Car.Model,
				}
			};

			return Ok(feedbackDto);
		}
    }
}
