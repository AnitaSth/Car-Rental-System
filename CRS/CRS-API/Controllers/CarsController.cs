using CRS_API.Models.Domain;
using Microsoft.AspNetCore.Mvc;
using CRS_API.Models.DTO;
using CRS_API.DB;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using CRS_API.Enums;
using CRS_API.Repositories;
using AutoMapper;
using System.Security.Claims;

namespace CRS_API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CarsController : ControllerBase
	{
		private readonly ICarRepository carRepository;
		private readonly IMapper mapper;

		public CarsController(ICarRepository carRepository, IMapper mapper)
		{
			this.carRepository = carRepository;
			this.mapper = mapper;
		} 

		// Get all cars
		[HttpGet]
		public async Task<IActionResult> GetAll()
		{
			// Get Data From Database - Domain models
			var carsDomain = await carRepository.GetAllAsync();

			// Map Domain Models to DTOs
			var carsDto = mapper.Map<List<CarDto>>(carsDomain);

			return Ok(carsDto);
		}

		// Get CRS cars
		[HttpGet("crs")]
		public async Task<IActionResult> GetCRSCars()
		{
			// Get Data From Database - Domain models
			var carsDomain = await carRepository.GetCRSCarsAsync();

			// Map Domain Models to DTOs
			var carsDto = mapper.Map<List<CarDto>>(carsDomain);

			return Ok(carsDto);
		}
		
		
		// Get CRS cars
		[HttpGet("thirdparty")]
		public async Task<IActionResult> GetThirdPartyCars()
		{
			// Get Data From Database - Domain models
			var carsDomain = await carRepository.GetThirdPartyCarsAsync();

			// Map Domain Models to DTOs
			var carsDto = mapper.Map<List<CarDto>>(carsDomain);

			return Ok(carsDto);
		}


		// Get car by Id
		[HttpGet("{id:Guid}")]
		public async Task<IActionResult> GetById([FromRoute] Guid id)
		{
			// Get Data From Database - Domain models
			Car? car = await carRepository.GetByIdAsync(id);

			if (car == null)
			{
				return NotFound();
			}

			// Map Domain Models to DTOs
			var carDto = mapper.Map<CarDto>(car);

			return Ok(carDto);
		}

		// Post car
		[HttpPost]
		[Authorize(Roles = "Admin, VehicleOwner")]
		public async Task<IActionResult> Create([FromBody] CarRequestDto carRequestDto)
		{
			// Map or Convert DTO to Domain Model
			var carDomain = mapper.Map<Car>(carRequestDto);

			// Use Domain Model to create Car
			carDomain = await carRepository.CreateAsync(carDomain);

			// Map Domain model back to DTO
			var carDto = mapper.Map<CarDto>(carDomain);

			return Ok(carDto);
		}

		[HttpPut("{id:Guid}")]
		[Authorize(Roles = "Admin, VehicleOwner")]
		public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] CarRequestDto carRequestDto) 
		{
			// Map DTO to Domain Model
			var carDomain = mapper.Map<Car>(carRequestDto);

			// Check if car exists
			carDomain =  await carRepository.UpdateAsync(id, carDomain);

			if (carDomain == null)
			{
				return NotFound();
			}

			// Get current user id
			var currentUserId = HttpContext.User.FindFirstValue("userId");

			// Check if the author of the car is the current user
			if (carDomain.UserId != Guid.Parse(currentUserId))
			{
				return Unauthorized();
			}

			// Convert Domain Model to DTO
			var carDto = mapper.Map<CarDto>(carDomain);

			return Ok(carDto);
		}


		[HttpDelete("{id:Guid}")]
		[Authorize(Roles = "Admin, VehicleOwner")]
		public async Task<IActionResult> Delete([FromRoute] Guid id)
		{
			var carDomain = await carRepository.DeleteAsync(id);

			if (carDomain == null)
			{
				return NotFound();
			}

			// Get current user id
			var currentUserId = HttpContext.User.FindFirstValue("userId");

			// Check if the author of the car is the current user
			if (carDomain.UserId != Guid.Parse(currentUserId))
			{
				return Unauthorized();
			}

			return NoContent();
		}
	}
}


