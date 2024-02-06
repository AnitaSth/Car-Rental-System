using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRS_API.Migrations
{
    /// <inheritdoc />
    public partial class addeddurationinrental : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Duration",
                table: "Rentals",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Duration",
                table: "Rentals");
        }
    }
}
