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
			claims.Add(new Claim("userId", user.Id.ToString()));


			var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]!));

			var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

			var token = new JwtSecurityToken(configuration["Jwt:Issuer"], configuration["Jwt:Audience"], claims: claims, expires: DateTime.Now.AddMinutes(30), signingCredentials: cred);

			var jwt = new JwtSecurityTokenHandler().WriteToken(token);

			return jwt;
		}

		
	}
}

/*
{
	"return_url": "https://example.com/payment/",
  "website_url": "https://example.com/",
  "amount": 1300,
  "purchase_order_id": "test12",
  "purchase_order_name": "test",
  "customer_info": {
		"name": "Ashim Upadhaya",
      "email": "example@gmail.com",
      "phone": "9811496763"
  }
}
*/