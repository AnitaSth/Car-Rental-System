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

		public DbSet<Rental> Rentals { get; set; }

		public DbSet<Feedback> Feedbacks { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<Rental>().HasOne(e => e.User).WithMany(e => e.Rentals).HasForeignKey(e => e.UserId).IsRequired().OnDelete(DeleteBehavior.Restrict);

			modelBuilder.Entity<Feedback>().HasOne(e => e.User).WithMany(e => e.Feedbacks).HasForeignKey(e => e.UserId).IsRequired().OnDelete(DeleteBehavior.Restrict);

			modelBuilder.Entity<Feedback>().HasOne(e => e.Car).WithMany(e => e.Feedbacks).HasForeignKey(e => e.CarId).IsRequired().OnDelete(DeleteBehavior.Restrict);
		}

		/*protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			modelBuilder.Entity<User>().HasIndex(u => u.PhoneNumber).IsUnique();

			// Seed user data
			*//*List<User> users = new List<User>()
			{
				new User
				{
					Id = Guid.Parse("7cf4a153-cba3-40f0-9366-235348dc1734"),
					PhoneNumber = "admin12345",
					PasswordHash = "$2a$12$SUousntAH3EtOEtpOckrHOI1SfP6RdC2zCPJdzN8OIYMs8C1ex656",
					FullName = "Aneeta Shrestha"
				}
				
			};

			modelBuilder.Entity<Car>().HasData(users);*//*



			// Seed Car data

			*//*List<Car> cars = new List<Car>()
			{
				new Car
				{
					Id = Guid.Parse("82fbf98a-33e1-4e42-b365-6e796143c5aa"),
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
					UserId = Guid.Parse("7cf4a153-cba3-40f0-9366-235348dc1734"),
				},
				new Car
				{
					Id = Guid.Parse("c4b082ae-529b-4503-9da1-e2c415a3c321"),
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
					UserId = Guid.Parse("7cf4a153-cba3-40f0-9366-235348dc1734"),
				},
				new Car
				{
					Id = Guid.Parse("1a5ef62a-fdb8-4b65-b274-4440b16e16b7"),
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
					UserId = Guid.Parse("7cf4a153-cba3-40f0-9366-235348dc1734"),
				},
				new Car
				{
					Id = Guid.Parse("6a1acfa6-8a00-4b42-8718-f845cf1f18be"),
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
					UserId = Guid.Parse("7cf4a153-cba3-40f0-9366-235348dc1734"),
				},
				new Car
				{
					Id = Guid.Parse("ee737d38-d320-4f20-b28f-7773759e051f"),
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
					UserId = Guid.Parse("7cf4a153-cba3-40f0-9366-235348dc1734"),
				}
			};

			modelBuilder.Entity<Car>().HasData(cars);
*//*
		}*/
	}
}
