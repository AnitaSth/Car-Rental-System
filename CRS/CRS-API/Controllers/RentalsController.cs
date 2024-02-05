using AutoMapper;
using CRS_API.DB;
using CRS_API.Enums;
using CRS_API.Interfaces;
using CRS_API.Models.Domain;
using CRS_API.Models.DTO;
using CRS_API.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace CRS_API.Controllers
{

	[Route("api/[controller]")]
	[ApiController]
	public class RentalsController : ControllerBase
	{
		private readonly CRSDbContext _db;
		private readonly IMapper mapper;
		private readonly IRentalsRepository rentalsRepository;

		public RentalsController(CRSDbContext _db, IMapper mapper, IRentalsRepository rentalsRepository)
        {
			this._db = _db;
			this.mapper = mapper;
			this.rentalsRepository = rentalsRepository;
		}


		[HttpGet]
		[Authorize(Roles = "Admin")]
		public async Task<IActionResult> GetAll()
		{
			// Get Data From Database - Domain models
			var rentalsDomain = await rentalsRepository.GetAll();

			// Map Domain Models to DTOs
			var rentalsDto = mapper.Map<RentalDto>(rentalsDomain);

			return Ok(rentalsDto);
		}


		[HttpGet("mine")]
		[Authorize]
		public async Task<IActionResult> Get()
		{
			// Get current user id
			var currentUserId = HttpContext.User.FindFirstValue("userId");

			// Get Data From Database - Domain models
			var rentalsDomain = await rentalsRepository.GetAsync(currentUserId);

			// Map Domain Models to DTOs
			var rentalsDto = mapper.Map<List<RentalDto>>(rentalsDomain);
			
			return Ok(rentalsDto);
		}


		[HttpPost]
		[Authorize]
		public async Task<IActionResult> Create([FromBody] RentalRequestDto rentalRequestDto)
		{
			// Map or Convert DTO to Domain Model
			var rentalDomain = mapper.Map<Rental>(rentalRequestDto);

			// Use Domain Model to create Rental
			rentalDomain = await rentalsRepository.CreateAsync(rentalDomain);

			// Map Domain model back to DTO
			var rentalDto = mapper.Map<RentalDto>(rentalDomain);

			return Ok(rentalDto);
		}
	}
}
