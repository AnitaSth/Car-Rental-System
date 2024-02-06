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

		public DbSet<Payment> Payment { get; set; }	

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<Rental>().HasOne(e => e.User).WithMany(e => e.Rentals).HasForeignKey(e => e.UserId).IsRequired().OnDelete(DeleteBehavior.NoAction);

			modelBuilder.Entity<Feedback>().HasOne(e => e.User).WithMany(e => e.Feedbacks).HasForeignKey(e => e.UserId).IsRequired().OnDelete(DeleteBehavior.NoAction);

			modelBuilder.Entity<Feedback>().HasOne(e => e.Car).WithMany(e => e.Feedbacks).HasForeignKey(e => e.CarId).IsRequired().OnDelete(DeleteBehavior.Cascade);

			modelBuilder.Entity<Payment>().HasOne(e => e.User).WithMany(e => e.Payments).HasForeignKey(e => e.UserId).IsRequired().OnDelete(DeleteBehavior.NoAction);

			modelBuilder.Entity<Payment>().HasOne(e => e.Rental).WithOne(e => e.Payment).HasForeignKey<Payment>(e => e.RentalId).IsRequired().OnDelete(DeleteBehavior.NoAction);
		}
	}
}
