using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRS_API.Migrations
{
    /// <inheritdoc />
    public partial class Changepaymenttypetopaymentmethod : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PaymentType",
                table: "Payment",
                newName: "PaymentMethod");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PaymentMethod",
                table: "Payment",
                newName: "PaymentType");
        }
    }
}
