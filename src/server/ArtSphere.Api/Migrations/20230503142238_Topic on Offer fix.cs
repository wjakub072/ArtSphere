using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArtSphere.Api.Migrations
{
    /// <inheritdoc />
    public partial class TopiconOfferfix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Topic",
                schema: "Sph",
                table: "Offers",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Offers_ArtistId",
                schema: "Sph",
                table: "Offers",
                column: "ArtistId");

            migrationBuilder.AddForeignKey(
                name: "FK_Offers_Users_ArtistId",
                schema: "Sph",
                table: "Offers",
                column: "ArtistId",
                principalSchema: "Sph",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Offers_Users_ArtistId",
                schema: "Sph",
                table: "Offers");

            migrationBuilder.DropIndex(
                name: "IX_Offers_ArtistId",
                schema: "Sph",
                table: "Offers");

            migrationBuilder.DropColumn(
                name: "Topic",
                schema: "Sph",
                table: "Offers");
        }
    }
}
