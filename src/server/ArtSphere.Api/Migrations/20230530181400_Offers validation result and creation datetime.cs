using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArtSphere.Api.Migrations
{
    /// <inheritdoc />
    public partial class Offersvalidationresultandcreationdatetime : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Approved",
                schema: "Sph",
                table: "Offers",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreationTime",
                schema: "Sph",
                table: "Offers",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "GETDATE()");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Approved",
                schema: "Sph",
                table: "Offers");

            migrationBuilder.DropColumn(
                name: "CreationTime",
                schema: "Sph",
                table: "Offers");
        }
    }
}
