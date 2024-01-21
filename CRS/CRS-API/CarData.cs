using CRS_API.Enums;
using CRS_API.Models.DTO;

namespace CRS_API
{
	public static class CarData
	{
		public static List<CarDto> Get()
		{
			var cars = new CarDto[]
			{
				new CarDto
				{
					Id = 1,
					Manufacturer = "Toyota",
					Model = "Camry",
					LicensePlate = "ABC123",
					Color = "Blue",
					FuelType = FuelType.Petrol.ToString(),
					TransmissionType = TransmissionType.Automatic.ToString(),
					Mileage = 30000,
					PassengerSeat = 5,
					RentalPrice = 2000,
					Condition = Condition.Excellent.ToString(),
					Images = "ImageURL1",
					Availability = true
				},
				new CarDto
				{
					Id = 2,
					Manufacturer = "Honda",
					Model = "Accord",
					LicensePlate = "XYZ789",
					Color = "Red",
					FuelType = FuelType.Petrol.ToString(),
					TransmissionType = TransmissionType.Manual.ToString(),
					Mileage = 25000,
					PassengerSeat = 4,
					RentalPrice = 2000,
					Condition = Condition.Bad.ToString(),
					Images = "ImageURL2",
					Availability = true
				},
				new CarDto
				{
					Id = 3,
					Manufacturer = "Ford",
					Model = "Fusion",
					LicensePlate = "DEF456",
					Color = "Silver",
					FuelType = FuelType.Petrol.ToString(),
					TransmissionType = TransmissionType.Automatic.ToString(),
					Mileage = 40000,
					PassengerSeat = 5,
					RentalPrice = 2500,
					Condition = Condition.Good.ToString(),
					Images = "ImageURL3",
					Availability = true
				},
				new CarDto
				{
					Id = 4,
					Manufacturer = "Chevrolet",
					Model = "Malibu",
					LicensePlate = "GHI789",
					Color = "Black",
					FuelType = FuelType.Petrol.ToString(),
					TransmissionType = TransmissionType.Manual.ToString(),
					Mileage = 3500,
					PassengerSeat = 4,
					RentalPrice = 3000,
					Condition = Condition.Excellent.ToString(),
					Images = "ImageURL4",
					Availability = true
				},
				new CarDto
				{
					Id = 5,
					Manufacturer = "Tesla",
					Model = "Model 3",
					LicensePlate = "JKL012",
					Color = "White",
					FuelType = FuelType.Electric.ToString(),
					TransmissionType = TransmissionType.Automatic.ToString(),
					Mileage = 20000,
					PassengerSeat = 5,
					RentalPrice = 4000,
					Condition = Condition.Good.ToString(),
					Images = "ImageURL5",
					Availability = true
				}
			};

			return cars.Select(c => new CarDto { Id = c.Id, Manufacturer = c.Manufacturer, Model = c.Model, LicensePlate = c.LicensePlate, Color = c.Color, FuelType = c.FuelType, TransmissionType = c.TransmissionType , Mileage = c.Mileage, PassengerSeat = c.PassengerSeat, RentalPrice = c.RentalPrice, Condition = c.Condition, Images = c.Images, Availability = c.Availability }).ToList();	
		}
	}
}
