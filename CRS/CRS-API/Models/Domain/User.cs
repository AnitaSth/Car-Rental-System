using CRS_API.Enums;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CRS_API.Models.Domain
{
	public class User
	{
		public Guid Id { get; set; }
		public string PhoneNumber { get; set; } = string.Empty;
		public string PasswordHash { get; set; } = string.Empty;
		public string FullName { get; set; } = string.Empty;
		public UserRole Role { get; set; }
		public ICollection<Rental> Rentals { get; } = new List<Rental>();
	}
}
