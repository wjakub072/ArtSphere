using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArtSphere.Api.Migrations
{
    /// <inheritdoc />
    public partial class DepositTokenmodel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                schema: "Sph",
                table: "Wallets",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "GETDATE()",
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2023, 5, 17, 17, 36, 1, 810, DateTimeKind.Local).AddTicks(3018));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreateDate",
                schema: "Sph",
                table: "ShoppingCartElements",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "GETDATE()",
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2023, 5, 17, 17, 36, 1, 809, DateTimeKind.Local).AddTicks(455));

            migrationBuilder.CreateTable(
                name: "DepositTokens",
                schema: "Sph",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETDATE()"),
                    ExpirationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DepositTokens", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DepositTokens_UserId",
                schema: "Sph",
                table: "DepositTokens",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DepositTokens",
                schema: "Sph");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                schema: "Sph",
                table: "Wallets",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2023, 5, 17, 17, 36, 1, 810, DateTimeKind.Local).AddTicks(3018),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValueSql: "GETDATE()");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreateDate",
                schema: "Sph",
                table: "ShoppingCartElements",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2023, 5, 17, 17, 36, 1, 809, DateTimeKind.Local).AddTicks(455),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValueSql: "GETDATE()");
        }
    }
}
