using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArtSphere.Api.Migrations
{
    /// <inheritdoc />
    public partial class CompanyaddressandIsinvoice : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CompanyAddressApartment",
                schema: "Sph",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CompanyAddressBuilding",
                schema: "Sph",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CompanyAddressCity",
                schema: "Sph",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CompanyAddressCountry",
                schema: "Sph",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CompanyAddressPostalCode",
                schema: "Sph",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CompanyAddressStreet",
                schema: "Sph",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsInvoice",
                schema: "Sph",
                table: "Orders",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CompanyAddressApartment",
                schema: "Sph",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "CompanyAddressBuilding",
                schema: "Sph",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "CompanyAddressCity",
                schema: "Sph",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "CompanyAddressCountry",
                schema: "Sph",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "CompanyAddressPostalCode",
                schema: "Sph",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "CompanyAddressStreet",
                schema: "Sph",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "IsInvoice",
                schema: "Sph",
                table: "Orders");
        }
    }
}
