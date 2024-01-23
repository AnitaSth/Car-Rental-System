using Microsoft.EntityFrameworkCore;
using CRS_API.Models.Domain;
using CRS_API.Enums;
using CRS_API.Models.DTO;

namespace CRS_API.DB
{
	public class CRSDbContext : DbContext
	{
        public CRSDbContext(DbContextOptions<CRSDbContext> dbContextOptions) : base(dbContextOptions)
        {
            
        }
		public DbSet<User> Users { get; set; }

		public DbSet<Car> Cars { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			modelBuilder.Entity<User>().HasIndex(u => u.PhoneNumber).IsUnique();

			// Seed Car data

			var cars = new List<Car>()
			{
				new Car
				{
					Id = 1,
					Manufacturer = "Toyota",
					Model = "Camry",
					LicensePlate = "ABC123",
					Color = "Blue",
					FuelType = FuelType.Petrol,
					TransmissionType = TransmissionType.Automatic,
					Mileage = 18.3F,
					PassengerSeat = 5,
					RentalPrice = 2800,
					Condition = Condition.Excellent,
					Image = "https://i.gaw.to/vehicles/photos/40/36/403605-2024-toyota-camry.jpg?1024x640",
					Availability = true,
					UserId = 1,
				},
				new Car
				{
					Id = 2,
					Manufacturer = "Honda",
					Model = "Accord",
					LicensePlate = "XYZ789",
					Color = "Red",
					FuelType = FuelType.Petrol,
					TransmissionType = TransmissionType.Manual,
					Mileage = 15F,
					PassengerSeat = 4,
					RentalPrice = 2000,
					Condition = Condition.Bad,
					Image = "https://imgd.aeplcdn.com/664x374/cw/ec/21613/Honda-Accord-Right-Front-Three-Quarter-64768.jpg?v=201711021421&q=80",
					Availability = true,
					UserId = 1,
				},
				new Car
				{
					Id = 3,
					Manufacturer = "Ford",
					Model = "Fusion",
					LicensePlate = "DEF456",
					Color = "Silver",
					FuelType = FuelType.Petrol,
					TransmissionType = TransmissionType.Automatic,
					Mileage = 16.3F,
					PassengerSeat = 5,
					RentalPrice = 2500,
					Condition = Condition.Good,
					Image = "https://media.ford.com/content/fordmedia/fna/us/en/products/past-models/fusion/2020-fusion/jcr:content/content/media-section-parsys/media_section_3cac/media-section-parsys/textimage_ee11/image.img.951.535.jpg/1570737852676.jpg",
					Availability = true,
					UserId = 1,
				},
				new Car
				{
					Id = 4,
					Manufacturer = "Chevrolet",
					Model = "Malibu",
					LicensePlate = "GHI789",
					Color = "Black",
					FuelType = FuelType.Petrol,
					TransmissionType = TransmissionType.Manual,
					Mileage = 14.8F,
					PassengerSeat = 4,
					RentalPrice = 3000,
					Condition = Condition.Excellent,
					Image = "https://di-uploads-pod1.dealerinspire.com/depaulachevy/uploads/2016/04/2016-Chevy-Malibu-Albany-NY-Black.jpg",
					Availability = true,
					UserId = 1,
				},
				new Car
				{
					Id = 5,
					Manufacturer = "Tesla",
					Model = "Model 3",
					LicensePlate = "JKL012",
					Color = "White",
					FuelType = FuelType.Electric,
					TransmissionType = TransmissionType.Automatic,
					Mileage = 500,
					PassengerSeat = 5,
					RentalPrice = 4500,
					Condition = Condition.Good,
					Image = "https://www.tesla.com/ownersmanual/images/GUID-B5641257-9E85-404B-9667-4DA5FDF6D2E7-online-en-US.png",
					Availability = true,
					UserId = 1,
				}
			};

			modelBuilder.Entity<Car>().HasData(cars);
		}
	}
}
