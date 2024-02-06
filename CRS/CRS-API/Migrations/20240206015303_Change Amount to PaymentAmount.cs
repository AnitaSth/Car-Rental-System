using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRS_API.Migrations
{
    /// <inheritdoc />
    public partial class ChangeAmounttoPaymentAmount : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Amount",
                table: "Payment",
                newName: "PaymentAmount");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PaymentAmount",
                table: "Payment",
                newName: "Amount");
        }
    }
}
