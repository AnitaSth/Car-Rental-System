using CRS_API.DB;
using CRS_API.Models.Domain;
using CRS_API.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CRS_API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class UsersController : ControllerBase
	{
		private readonly CRSDbContext _db;

		public UsersController(CRSDbContext _db)
        {
			this._db = _db;
		}

		[HttpGet]
		[Authorize(Roles = "Admin")]
		public ActionResult<List<UserDto>> Get()
		{
			List<User> users = _db.Users.ToList();

			List<UserDto> usersDto = new List<UserDto>();

			foreach (var user in users)
			{
				usersDto.Add(new UserDto
				{
					Id = user.Id,
					PhoneNumber = user.PhoneNumber,
					FullName = user.FullName,
					Role = user.Role.ToString()
				});
			}

			return Ok(usersDto);
		}

		[HttpDelete("{id:Guid}")]
		[Authorize(Roles = "Admin")]
		public IActionResult Delete(Guid id)
		{
			User user = _db.Users.FirstOrDefault(x => x.Id == id);	

			if (user == null)
			{
				return NotFound();
			}

			_db.Users.Remove(user);
			_db.SaveChanges();
			return NoContent();
		}
	}
}
