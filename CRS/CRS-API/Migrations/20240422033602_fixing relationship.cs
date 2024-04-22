using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRS_API.Migrations
{
    /// <inheritdoc />
    public partial class fixingrelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Payment_Rentals_RentalId",
                table: "Payment");

            migrationBuilder.AddForeignKey(
                name: "FK_Payment_Rentals_RentalId",
                table: "Payment",
                column: "RentalId",
                principalTable: "Rentals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Payment_Rentals_RentalId",
                table: "Payment");

            migrationBuilder.AddForeignKey(
                name: "FK_Payment_Rentals_RentalId",
                table: "Payment",
                column: "RentalId",
                principalTable: "Rentals",
                principalColumn: "Id");
        }
    }
}
