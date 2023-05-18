using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArtSphere.Api.Migrations
{
    /// <inheritdoc />
    public partial class CompressedPictureofferimplementation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CompressedPicture",
                schema: "Sph",
                table: "Offers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tags_OfferId",
                schema: "Sph",
                table: "Tags",
                column: "OfferId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tags_Offers_OfferId",
                schema: "Sph",
                table: "Tags",
                column: "OfferId",
                principalSchema: "Sph",
                principalTable: "Offers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tags_Offers_OfferId",
                schema: "Sph",
                table: "Tags");

            migrationBuilder.DropIndex(
                name: "IX_Tags_OfferId",
                schema: "Sph",
                table: "Tags");

            migrationBuilder.DropColumn(
                name: "CompressedPicture",
                schema: "Sph",
                table: "Offers");
        }
    }
}
