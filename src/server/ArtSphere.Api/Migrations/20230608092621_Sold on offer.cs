using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArtSphere.Api.Migrations
{
    /// <inheritdoc />
    public partial class Soldonoffer : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderELements_Orders_OrderId",
                schema: "Sph",
                table: "OrderELements");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OrderELements",
                schema: "Sph",
                table: "OrderELements");

            migrationBuilder.RenameTable(
                name: "OrderELements",
                schema: "Sph",
                newName: "OrderElements",
                newSchema: "Sph");

            migrationBuilder.RenameIndex(
                name: "IX_OrderELements_OrderId",
                schema: "Sph",
                table: "OrderElements",
                newName: "IX_OrderElements_OrderId");

            migrationBuilder.AddColumn<bool>(
                name: "Sold",
                schema: "Sph",
                table: "Offers",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddPrimaryKey(
                name: "PK_OrderElements",
                schema: "Sph",
                table: "OrderElements",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_OrderElements_OfferId",
                schema: "Sph",
                table: "OrderElements",
                column: "OfferId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderElements_Offers_OfferId",
                schema: "Sph",
                table: "OrderElements",
                column: "OfferId",
                principalSchema: "Sph",
                principalTable: "Offers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderElements_Orders_OrderId",
                schema: "Sph",
                table: "OrderElements",
                column: "OrderId",
                principalSchema: "Sph",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderElements_Offers_OfferId",
                schema: "Sph",
                table: "OrderElements");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderElements_Orders_OrderId",
                schema: "Sph",
                table: "OrderElements");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OrderElements",
                schema: "Sph",
                table: "OrderElements");

            migrationBuilder.DropIndex(
                name: "IX_OrderElements_OfferId",
                schema: "Sph",
                table: "OrderElements");

            migrationBuilder.DropColumn(
                name: "Sold",
                schema: "Sph",
                table: "Offers");

            migrationBuilder.RenameTable(
                name: "OrderElements",
                schema: "Sph",
                newName: "OrderELements",
                newSchema: "Sph");

            migrationBuilder.RenameIndex(
                name: "IX_OrderElements_OrderId",
                schema: "Sph",
                table: "OrderELements",
                newName: "IX_OrderELements_OrderId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OrderELements",
                schema: "Sph",
                table: "OrderELements",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderELements_Orders_OrderId",
                schema: "Sph",
                table: "OrderELements",
                column: "OrderId",
                principalSchema: "Sph",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
