using CRS_API.Models.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CRS_API.Models.DTO;
using CRS_API.DB;
using Microsoft.EntityFrameworkCore;

namespace CRS_API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CarsController : ControllerBase
	{
		private readonly CRSDbContext _db;

		public CarsController(CRSDbContext _db)
        {
			this._db = _db;
		}

        // Get all cars
        [HttpGet]
		public async Task<IActionResult> GetAll()
		{
			List<Car> cars = await _db.Cars.ToListAsync();


			List<CarDto> carsDto = new List<CarDto>();

			foreach(var car in cars) 
			{
				carsDto.Add(new CarDto()
				{
					Id = car.Id,
					Manufacturer = car.Manufacturer,
					Model = car.Model,
					LicensePlate = car.LicensePlate,
					Color = car.Color,
					FuelType = car.FuelType.ToString(),
					TransmissionType = car.TransmissionType.ToString(),
					Mileage = car.Mileage,
					PassengerSeat = car.PassengerSeat,
					RentalPrice = car.RentalPrice,
					Condition = car.Condition.ToString(),
					Images = car.Images,
					Availability = car.Availability
				});	
			}

			return Ok(carsDto);
		}

		// Get car by Id
		[HttpGet]
		[Route("{id:int}")]
		public async Task<IActionResult> GetById([FromRoute] int id)
		{
			Car? car = await _db.Cars.FirstOrDefaultAsync(car => car.Id == id);
			
			if (car == null)
			{
				return NotFound();
			}

			CarDto carDto = new CarDto()
			{
				Id = car.Id,
				Manufacturer = car.Manufacturer,
				Model = car.Model,
				LicensePlate = car.LicensePlate,
				Color = car.Color,
				FuelType = car.FuelType.ToString(),
				TransmissionType = car.TransmissionType.ToString(),
				Mileage = car.Mileage,
				PassengerSeat = car.PassengerSeat,
				RentalPrice = car.RentalPrice,
				Condition = car.Condition.ToString(),
				Images = car.Images,
				Availability = car.Availability
			};

			return Ok(carDto);
		}
	}
}
