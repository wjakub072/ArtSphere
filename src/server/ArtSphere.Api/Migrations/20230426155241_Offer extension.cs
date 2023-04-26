using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArtSphere.Api.Migrations
{
    /// <inheritdoc />
    public partial class Offerextension : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "DimensionsY",
                schema: "Sph",
                table: "Offers",
                type: "decimal(11,4)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AlterColumn<decimal>(
                name: "DimensionsX",
                schema: "Sph",
                table: "Offers",
                type: "decimal(11,4)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AddColumn<bool>(
                name: "Archived",
                schema: "Sph",
                table: "Offers",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<byte[]>(
                name: "Picture",
                schema: "Sph",
                table: "Offers",
                type: "varbinary(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Archived",
                schema: "Sph",
                table: "Offers");

            migrationBuilder.DropColumn(
                name: "Picture",
                schema: "Sph",
                table: "Offers");

            migrationBuilder.AlterColumn<decimal>(
                name: "DimensionsY",
                schema: "Sph",
                table: "Offers",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(11,4)");

            migrationBuilder.AlterColumn<decimal>(
                name: "DimensionsX",
                schema: "Sph",
                table: "Offers",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(11,4)");
        }
    }
}
