using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArtSphere.Api.Migrations
{
    /// <inheritdoc />
    public partial class UserModelAddress : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AddressAppartment",
                schema: "Sph",
                table: "Users",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AddressBuilding",
                schema: "Sph",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AddressCity",
                schema: "Sph",
                table: "Users",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AddressCountry",
                schema: "Sph",
                table: "Users",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AddressStreet",
                schema: "Sph",
                table: "Users",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                schema: "Sph",
                table: "Users",
                type: "nvarchar(16)",
                maxLength: 16,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AddressAppartment",
                schema: "Sph",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "AddressBuilding",
                schema: "Sph",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "AddressCity",
                schema: "Sph",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "AddressCountry",
                schema: "Sph",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "AddressStreet",
                schema: "Sph",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                schema: "Sph",
                table: "Users");
        }
    }
}
