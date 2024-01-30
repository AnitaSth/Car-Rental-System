using CRS_API.DB;
using CRS_API.Enums;
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
	public class RentalsController : ControllerBase
	{
		private readonly CRSDbContext _db;

		public RentalsController(CRSDbContext _db)
        {
			this._db = _db;
		}


		[HttpGet]
		[Authorize(Roles = "Admin, VehicleOwner, Customer")]
		public ActionResult<List<RentalDto>> Get(Guid id)
		{
			var rentals = new List<Rental>();
		
			bool isAdmin = _db.Users.Any(u => u.Id == id && u.Role == UserRole.Admin);

			if (isAdmin)
			{
				rentals = _db.Rentals.Include("User").Include("Car").ToList();
			}
			else
			{
				rentals = _db.Rentals.Where(r => r.UserId == id).Include("User").Include("Car").ToList();
			}

			List<RentalDto> rentalsDto = new List<RentalDto>();

			foreach (var rental in rentals)
			{
				rentalsDto.Add(new RentalDto()
				{
					Id = rental.Id,
					UserId = rental.UserId,
					CarId = rental.CarId,
					StartDate = rental.StartDate,
					EndDate = rental.EndDate,
					TotalCost = rental.TotalCost,
					User = new UserDto
					{
						Id = rental.User.Id,
						PhoneNumber = rental.User.PhoneNumber,
						FullName = rental.User.FullName,
						Role = rental.User.Role.ToString(),
					},
					Car = new CarResponseDto
					{
						Id = rental.Car.Id,
						Manufacturer = rental.Car.Manufacturer,
						Model = rental.Car.Model,
					}
				});
			}

			return Ok(rentalsDto);

		}
			

		[HttpPost]
		[Authorize(Roles = "Admin, VehicleOwner, Customer")]
		public ActionResult<RentalDto> Create([FromBody] RentalRequestDto rentalRequestDto)
		{
			Rental rental = new Rental
			{
				UserId = rentalRequestDto.UserId,
				CarId = rentalRequestDto.CarId,
				StartDate = rentalRequestDto.StartDate,
				EndDate = rentalRequestDto.EndDate,
				TotalCost = rentalRequestDto.TotalCost,
			};


			_db.Add(rental);
			_db.SaveChanges();

			rental = _db.Rentals.Include("User").Include("Car").FirstOrDefault(r => r.Id == rental.Id);

			RentalDto rentalDto = new RentalDto
			{
				Id = rental.Id,
				UserId = rental.UserId,
				CarId = rental.CarId,
				StartDate = rental.StartDate,
				EndDate = rental.EndDate,
				TotalCost = rental.TotalCost,
				User = new UserDto
				{
					Id = rental.User.Id,
					PhoneNumber = rental.User.PhoneNumber,
					FullName = rental.User.FullName,
					Role = rental.User.Role.ToString(),
				},
				Car = new CarResponseDto
				{
					Id = rental.Car.Id,
					Manufacturer = rental.Car.Manufacturer,
					Model = rental.Car.Model,
				}
			};


			return Ok(rentalDto);
		}
	}
}
