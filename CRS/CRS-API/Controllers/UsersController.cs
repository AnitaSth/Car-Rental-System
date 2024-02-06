using AutoMapper;
using CRS_API.DB;
using CRS_API.Interfaces;
using CRS_API.Models.Domain;
using CRS_API.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace CRS_API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class UsersController : ControllerBase
	{
		private readonly IUserRepository userRepository;
		private readonly IMapper mapper;

		public UsersController(IUserRepository userRepository, IMapper mapper)
		{
			this.userRepository = userRepository;
			this.mapper = mapper;
		}


		[HttpGet]
		[Authorize(Roles = "Admin")]
		public async Task<IActionResult> GetAll()
		{
			// Map DTO to Domain Model
			var usersDomain = await userRepository.GetAllAsync();

			// Convert Domain Model to DTO
			var usersDto = mapper.Map<List<UserDto>>(usersDomain);

			return Ok(usersDto);
		}

		[HttpGet("profile")]
		[Authorize]
		public async Task<IActionResult> GetProfile()
		{
			// Get current logged in user Id
			var currentUserId = HttpContext.User.FindFirstValue("userId");

			// Map DTO to Domain Model
			var usersDomain = await userRepository.GetProfileAsync(currentUserId);

			// Convert Domain Model to DTO
			var usersDto = mapper.Map<UserDto>(usersDomain);

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
