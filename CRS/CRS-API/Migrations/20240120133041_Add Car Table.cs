using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CRS_API.Migrations
{
    /// <inheritdoc />
    public partial class AddCarTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cars",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Manufacturer = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Model = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LicensePlate = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Color = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FuelType = table.Column<int>(type: "int", nullable: false),
                    TransmissionType = table.Column<int>(type: "int", nullable: false),
                    Mileage = table.Column<float>(type: "real", nullable: false),
                    PassengerSeat = table.Column<int>(type: "int", nullable: false),
                    RentalPrice = table.Column<int>(type: "int", nullable: false),
                    Condition = table.Column<int>(type: "int", nullable: false),
                    Images = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Availability = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cars", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Cars",
                columns: new[] { "Id", "Availability", "Color", "Condition", "FuelType", "Images", "LicensePlate", "Manufacturer", "Mileage", "Model", "PassengerSeat", "RentalPrice", "TransmissionType" },
                values: new object[,]
                {
                    { 1, true, "Blue", 0, 0, "ImageURL1", "ABC123", "Toyota", 30000f, "Camry", 5, 2800, 0 },
                    { 2, true, "Red", 3, 0, "ImageURL2", "XYZ789", "Honda", 25000f, "Accord", 4, 2000, 1 },
                    { 3, true, "Silver", 1, 0, "ImageURL3", "DEF456", "Ford", 40000f, "Fusion", 5, 2500, 0 },
                    { 4, true, "Black", 0, 0, "ImageURL4", "GHI789", "Chevrolet", 35000f, "Malibu", 4, 3000, 1 },
                    { 5, true, "White", 1, 2, "ImageURL5", "JKL012", "Tesla", 20000f, "Model 3", 5, 4500, 0 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Cars");
        }
    }
}
