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

        public DbSet<Car> Cars { get; set; }
		public DbSet<User> Users { get; set; }

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
					Mileage = 30000,
					PassengerSeat = 5,
					RentalPrice = 2800,
					Condition = Condition.Excellent,
					Image = "ImageURL1",
					Availability = true
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
					Mileage = 25000,
					PassengerSeat = 4,
					RentalPrice = 2000,
					Condition = Condition.Bad,
					Image = "ImageURL2",
					Availability = true
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
					Mileage = 40000,
					PassengerSeat = 5,
					RentalPrice = 2500,
					Condition = Condition.Good,
					Image = "ImageURL3",
					Availability = true
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
					Mileage = 35000,
					PassengerSeat = 4,
					RentalPrice = 3000,
					Condition = Condition.Excellent,
					Image = "ImageURL4",
					Availability = true
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
					Mileage = 20000,
					PassengerSeat = 5,
					RentalPrice = 4500,
					Condition = Condition.Good,
					Image = "ImageURL5",
					Availability = true
				}
			};

			modelBuilder.Entity<Car>().HasData(cars);
		}
	}
}
