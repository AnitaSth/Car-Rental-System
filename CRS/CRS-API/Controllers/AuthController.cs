using CRS_API.DB;
using CRS_API.Enums;
using CRS_API.Models.Domain;
using CRS_API.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRS_API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AuthController : ControllerBase
	{
		private readonly CRSDbContext _db;
		private IConfiguration _configuration;

		public AuthController(CRSDbContext _db, IConfiguration configuration)
        {
			this._db = _db;
			this._configuration = configuration;
		}

        [HttpPost("register")]
		public async Task<IActionResult> Register(UserRequestDto user)
		{
			string passwordHash = BCrypt.Net.BCrypt.HashPassword(user.Password);

			var existingUser = await _db.Users.FirstOrDefaultAsync(x => x.PhoneNumber == user.PhoneNumber);

			if (existingUser != null)
			{
				return BadRequest("This user already exists.");
			}

			if (user.IsValidRole())
			{
				User newUser = new User
				{
					PhoneNumber = user.PhoneNumber,
					PasswordHash = passwordHash,
					FullName = user.FullName,
					Role = (UserRole)Enum.Parse(typeof(UserRole), user.Role)
				};

				await _db.Users.AddAsync(newUser);
				await _db.SaveChangesAsync();

				UserDto userDto = new UserDto
				{
					Id = newUser.Id,
					PhoneNumber = newUser.PhoneNumber,
					FullName = newUser.FullName,
					Role = user.Role,
				};

				return Ok(userDto);
			}
            return BadRequest("Invalid role");
		}

		[HttpPost("login")]
		public async Task<IActionResult> Login(UserLoginDto request)
		{
			User? user = await _db.Users.FirstOrDefaultAsync(x => x.PhoneNumber == request.PhoneNumber);

			if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
			{
				return BadRequest("Invalid phone number or password");
			}

			string token = Utils.CreateToken(_configuration, user);

			UserResponseDto userDto = new UserResponseDto
			{
				Id = user.Id,
				PhoneNumber = user.PhoneNumber,
				FullName = user.FullName,
				Role = user.Role.ToString(),
				Token = token
			};

			return Ok(userDto);
		}
	}
}
