using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRS_API.Migrations
{
    /// <inheritdoc />
    public partial class changeRentalandPaymentrelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Payment_RentalId",
                table: "Payment");

            migrationBuilder.CreateIndex(
                name: "IX_Payment_RentalId",
                table: "Payment",
                column: "RentalId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Payment_RentalId",
                table: "Payment");

            migrationBuilder.CreateIndex(
                name: "IX_Payment_RentalId",
                table: "Payment",
                column: "RentalId");
        }
    }
}
