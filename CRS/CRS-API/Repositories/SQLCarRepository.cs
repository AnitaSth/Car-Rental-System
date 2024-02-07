using CRS_API.DB;
using CRS_API.Enums;
using CRS_API.Models.Domain;
using CRS_API.Models.DTO;
using Microsoft.EntityFrameworkCore;

namespace CRS_API.Repositories
{
	public class SQLCarRepository : ICarRepository
	{
		private readonly CRSDbContext _db;

		public SQLCarRepository(CRSDbContext _db)
        {
			this._db = _db;
		}

        public async Task<List<Car>> GetAllAsync()
		{
			return await _db.Cars.Include("User").ToListAsync();
		}


		public async Task<List<Car>> GetCRSCarsAsync()
		{
			return await _db.Cars.Include("User").Where(x => x.User.Role == UserRole.Admin).ToListAsync();
		}

		public async Task<List<Car>> GetThirdPartyCarsAsync()
		{
			return await _db.Cars.Include("User").Where(x => x.User.Role == UserRole.VehicleOwner).ToListAsync();
		}

		public async Task<Car?> GetByIdAsync(Guid id)
		{
			return await _db.Cars.Include("User").Include(car => car.Feedbacks).FirstOrDefaultAsync(car => car.Id == id);
		}

		public async Task<Car> CreateAsync(Car car)
		{
			await _db.Cars.AddAsync(car);
			await _db.SaveChangesAsync();
			return car;
		}

		public async Task<Car> UpdateAsync(Guid id, Car car)
		{
			var existingCar = await _db.Cars.FirstOrDefaultAsync(x => x.Id == id);

			if (existingCar == null)
			{
				return null;
			}

			existingCar.Manufacturer = car.Manufacturer;
			existingCar.Model = car.Model;
			existingCar.LicensePlate = car.LicensePlate;
			existingCar.Color = car.Color;
			existingCar.FuelType = car.FuelType;
			existingCar.TransmissionType = car.TransmissionType;
			existingCar.Mileage = car.Mileage;
			existingCar.PassengerSeat = car.PassengerSeat;
			existingCar.RentalPrice = car.RentalPrice;
			existingCar.Condition = car.Condition;
			existingCar.Image = car.Image;
			existingCar.Availability = car.Availability;
			existingCar.UserId = car.UserId;

			await _db.SaveChangesAsync();
			return existingCar;
		}

		public async Task<Car?> DeleteAsync(Guid id)
		{
			var existingCar = await _db.Cars.FirstOrDefaultAsync(x => x.Id == id);

			if (existingCar == null)
			{
				return null;
			}

			_db.Cars.Remove(existingCar);
			await _db.SaveChangesAsync();
			return existingCar;
		}
	}
}
