﻿using CRS_API.Enums;

namespace CRS_API.Models.DTO
{
	public class UserRequestDto 
	{
		public required string PhoneNumber { get; set; }
		public required string Password { get; set; }
		public required string FullName { get; set; }
		public required string Role { get; set; }
	}
}
