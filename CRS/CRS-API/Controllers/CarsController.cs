using CRS_API.Models.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CRS_API.Models.DTO;
using CRS_API.DB;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using CRS_API.Enums;
using static System.Net.Mime.MediaTypeNames;
using System.Drawing;

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
		//[Authorize(Roles = "Admin, Customer, VehicleOwner")]
		public ActionResult<List<CarDto>> GetAll()
		{
			List<Car> cars = _db.Cars.Include("User").ToList();


			List<CarDto> carsDto = new List<CarDto>();

			foreach (var car in cars)
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
					Image = car.Image,
					Availability = car.Availability,
					User = new UserDto
					{
						Id = car.User.Id,
						PhoneNumber = car.User.PhoneNumber,	
						FullName = car.User.FullName,
						Role = car.User.Role.ToString(),
					}
				});
			}

			return Ok(carsDto);
		}

		// Get CRS cars
		[HttpGet("crs")]
		//[Authorize(Roles = "Admin, Customer, VehicleOwner")]
		public ActionResult<List<CarDto>> GetCRSCars()
		{
			var cars = _db.Cars.Include("User").Where(x => x.User.Role == UserRole.Admin).ToList();


			List<CarDto> carsDto = new List<CarDto>();

			foreach (var car in cars)
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
					Image = car.Image,
					Availability = car.Availability,
					User = new UserDto
					{
						Id = car.User.Id,
						PhoneNumber = car.User.PhoneNumber,
						FullName = car.User.FullName,
						Role = car.User.Role.ToString(),
					}
				});
			}

			return Ok(carsDto);
		}
		
		
		// Get CRS cars
		[HttpGet("thirdparty")]
		//[Authorize(Roles = "Admin, Customer, VehicleOwner")]
		public ActionResult<List<CarDto>> GetThirdPartyCars()
		{
			var cars = _db.Cars.Include("User").Where(x => x.User.Role == UserRole.VehicleOwner).ToList();


			List<CarDto> carsDto = new List<CarDto>();

			foreach (var car in cars)
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
					Image = car.Image,
					Availability = car.Availability,
					User = new UserDto
					{
						Id = car.User.Id,
						PhoneNumber = car.User.PhoneNumber,
						FullName = car.User.FullName,
						Role = car.User.Role.ToString(),
					}
				});
			}

			return Ok(carsDto);
		}


		// Get car by Id
		[HttpGet("{id:Guid}")]
		//[Authorize(Roles = "Admin, Customer, VehicleOwner")]
		public ActionResult<CarDto> GetById(Guid id)
		{
			Car? car = _db.Cars.Include("User").FirstOrDefault(car => car.Id == id);

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
				Image = car.Image,
				Availability = car.Availability,
				User = new UserDto
				{
					Id = car.User.Id,
					PhoneNumber = car.User.PhoneNumber,
					FullName = car.User.FullName,
					Role = car.User.Role.ToString(),
				}
			};

			return Ok(carDto);
		}

		// Post car
		[HttpPost]
		[Authorize(Roles = "Admin, VehicleOwner")]
		public ActionResult<CarDto> Create([FromBody] CarRequestDto carRequestDto)
		{
			Car car = new Car
			{
				Manufacturer = carRequestDto.Manufacturer,
				Model = carRequestDto.Model,
				LicensePlate = carRequestDto.LicensePlate,
				Color = carRequestDto.Color,
				FuelType = (FuelType)Enum.Parse(typeof(FuelType), carRequestDto.FuelType),
				TransmissionType = (TransmissionType)Enum.Parse(typeof(TransmissionType), carRequestDto.TransmissionType),
				Mileage = carRequestDto.Mileage,
				PassengerSeat = carRequestDto.PassengerSeat,
				RentalPrice = carRequestDto.RentalPrice,
				Condition = (Condition)Enum.Parse(typeof(Condition), carRequestDto.Condition),
				Image = carRequestDto.Image,
				Availability = carRequestDto.Availability,
				UserId = carRequestDto.UserId,
			};

			_db.Add(car);
			_db.SaveChanges();

			car = _db.Cars.Include("User").FirstOrDefault(c => c.Id == car.Id);

			CarDto carDto = new CarDto
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
				Image = car.Image,
				Availability = car.Availability,
				User = new UserDto
				{
					Id = car.User.Id,
					PhoneNumber = car.User.PhoneNumber,
					FullName = car.User.FullName,
					Role = car.User.Role.ToString(),
				}
			};

			return Ok(carDto);
		}


		[HttpDelete("{id:Guid}")]
		[Authorize(Roles = "Admin, VehicleOwner")]
		public IActionResult Delete(Guid id)
		{
			Car car = _db.Cars.FirstOrDefault(x => x.Id == id);

			if (car == null)
			{
				return BadRequest("Car not found.");
			}

			_db.Cars.Remove(car);	
			_db.SaveChanges();
			return NoContent();	
		}

		[HttpPut("{id:Guid}")]
		[Authorize(Roles = "Admin, VehicleOwner")]
		public ActionResult<CarDto> Update(Guid id, [FromBody] CarRequestDto carRequestDto) 
		{
			Car car = _db.Cars.FirstOrDefault(x => x.Id == id);

			if (car == null)
			{
				return BadRequest("Car not found");
			}

			car.Manufacturer = carRequestDto.Manufacturer;
			car.Model = carRequestDto.Model;
			car.LicensePlate = carRequestDto.LicensePlate;
			car.Color = carRequestDto.Color;
			car.FuelType = (FuelType)Enum.Parse(typeof (FuelType), carRequestDto.FuelType);
			car.TransmissionType = (TransmissionType)Enum.Parse(typeof (TransmissionType), carRequestDto.TransmissionType);
			car.Mileage = carRequestDto.Mileage;
			car.PassengerSeat = carRequestDto.PassengerSeat;
			car.RentalPrice = carRequestDto.RentalPrice;
			car.Condition = (Condition)Enum.Parse(typeof(Condition), carRequestDto.Condition);
			car.Image = carRequestDto.Image;
			car.Availability = carRequestDto.Availability;
			car.UserId = carRequestDto.UserId;

			_db.SaveChanges();

			car = _db.Cars.Include("User").FirstOrDefault(c => c.Id == car.Id)!;


			CarDto carDto = new CarDto
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
				Image = car.Image,
				Availability = car.Availability,
				User = new UserDto
				{
					Id = car.User.Id,
					PhoneNumber = car.User.PhoneNumber,
					FullName = car.User.FullName,
					Role = car.User.Role.ToString(),
				}
			};

			return Ok(carDto);
		}
	}
}


/*{
	"manufacturer": "KIA",
  "model": "Sportage",
  "licensePlate": "KI678",
  "color": "Black",
  "fuelType": "Petrol",
  "transmissionType": "Automatic",
  "mileage": 16,
  "passengerSeat": 4,
  "rentalPrice": 3400,
  "condition": "Good",
  "image": "https://s7d2.scene7.com/is/image/kiamotors/kia_sportage-hev_2024_mep_dynamic_hero_1:XL?$LandscapeAsset_1440x730$&fmt=jpg&qlt=100,0&resMode=sharp2&op_usm=1.75,0.9,1,0&dpr=on,2",
  "availability": true,
  "userId": 2
}*/