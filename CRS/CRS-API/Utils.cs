using CRS_API.Models.Domain;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CRS_API
{
	public static class Utils
	{
		public static string CreateToken(IConfiguration configuration, User user)
		{
			List<Claim> claims = new List<Claim>();

			claims.Add(new Claim(ClaimTypes.Name, user.PhoneNumber));
			claims.Add(new Claim(ClaimTypes.Role, user.Role.ToString()));


			var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]!));

			var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

			var token = new JwtSecurityToken(configuration["Jwt:Issuer"], configuration["Jwt:Audience"], claims: claims, expires: DateTime.Now.AddSeconds(15), signingCredentials: cred);

			var jwt = new JwtSecurityTokenHandler().WriteToken(token);

			return jwt;
		}
	}
}
