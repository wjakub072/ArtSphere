using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArtSphere.Api.Migrations
{
    /// <inheritdoc />
    public partial class ShoppingCartandwalletmodels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ShoppingCartElements",
                schema: "Sph",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    OfferId = table.Column<int>(type: "int", nullable: false),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValue: new DateTime(2023, 5, 17, 17, 36, 1, 809, DateTimeKind.Local).AddTicks(455))
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShoppingCartElements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ShoppingCartElements_Offers_OfferId",
                        column: x => x.OfferId,
                        principalSchema: "Sph",
                        principalTable: "Offers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_ShoppingCartElements_Users_UserId",
                        column: x => x.UserId,
                        principalSchema: "Sph",
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "Wallets",
                schema: "Sph",
                columns: table => new
                {
                    WalletId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Balance = table.Column<decimal>(type: "decimal(15,4)", precision: 15, scale: 4, nullable: false, defaultValue: 0m),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValue: new DateTime(2023, 5, 17, 17, 36, 1, 810, DateTimeKind.Local).AddTicks(3018)),
                    LastUpdated = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Wallets", x => x.WalletId);
                    table.ForeignKey(
                        name: "FK_Wallets_Users_UserId",
                        column: x => x.UserId,
                        principalSchema: "Sph",
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ShoppingCartElements_OfferId",
                schema: "Sph",
                table: "ShoppingCartElements",
                column: "OfferId");

            migrationBuilder.CreateIndex(
                name: "IX_ShoppingCartElements_UserId",
                schema: "Sph",
                table: "ShoppingCartElements",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Wallets_UserId",
                schema: "Sph",
                table: "Wallets",
                column: "UserId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ShoppingCartElements",
                schema: "Sph");

            migrationBuilder.DropTable(
                name: "Wallets",
                schema: "Sph");
        }
    }
}
