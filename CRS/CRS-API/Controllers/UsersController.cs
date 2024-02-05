using AutoMapper;
using CRS_API.DB;
using CRS_API.Interfaces;
using CRS_API.Models.Domain;
using CRS_API.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CRS_API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class UsersController : ControllerBase
	{
		private readonly CRSDbContext _db;
		private readonly IUserRepository userRepository;
		private readonly IMapper mapper;

		public UsersController(CRSDbContext _db, IUserRepository userRepository, IMapper mapper)
		{
			this._db = _db;
			this.userRepository = userRepository;
			this.mapper = mapper;
		}


		[HttpGet]
		[Authorize(Roles = "Admin")]
		public async Task<IActionResult> GetAll()
		{
			var usersDomain = await userRepository.GetAllAsync();

			var usersDto = mapper.Map<List<UserDto>>(usersDomain);

			return Ok(usersDto);
		}


		[HttpDelete("{id:Guid}")]
		[Authorize(Roles = "Admin")]
		public async Task<IActionResult> Delete([FromRoute] Guid id)
		{
			var userDomain = await userRepository.DeleteAsync(id);

			if (userDomain == null)
			{
				return NotFound();
			}

			return NoContent();
		}
	}
}
