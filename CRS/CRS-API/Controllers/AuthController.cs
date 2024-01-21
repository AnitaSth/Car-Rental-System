using CRS_API.DB;
using CRS_API.Enums;
using CRS_API.Models.Domain;
using CRS_API.Models.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace CRS_API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AuthController : ControllerBase
	{
		private readonly CRSDbContext _db;
		public IConfiguration _configuration;

		public AuthController(CRSDbContext _db, IConfiguration configuration)
        {
			this._db = _db;
			this._configuration = configuration;
		}

        [HttpPost("register")]
		public ActionResult<UserDto> Register(UserRequestDto user)
		{
			string passwordHash = BCrypt.Net.BCrypt.HashPassword(user.Password);

			if (user.IsValidRole())
			{
				User newUser = new User
				{
					PhoneNumber = user.PhoneNumber,
					PasswordHash = passwordHash,
					Role = (UserRole)Enum.Parse(typeof(UserRole), user.Role)
				};

				_db.Users.Add(newUser);
				_db.SaveChanges();

				UserDto userDto = new UserDto
				{
					Id = newUser.Id,
					PhoneNumber = newUser.PhoneNumber,
					Role = user.Role,
				};

				return Ok(userDto);
			}

			return BadRequest("Invalid role");
		}

		[HttpPost("login")]
		public ActionResult<UserResponseDto> Login(UserLoginDto request)
		{
			User? user = _db.Users.FirstOrDefault(x => x.PhoneNumber == request.PhoneNumber);

			if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
			{
				return BadRequest("Invalid phone number or password");
			}

			string token = Utils.CreateToken(_configuration, user);

			UserResponseDto userDto = new UserResponseDto
			{
				Id = user.Id,
				PhoneNumber = user.PhoneNumber,
				Role = user.Role.ToString(),
				Token = token
			};

			return Ok(userDto);
		}
	}
}
