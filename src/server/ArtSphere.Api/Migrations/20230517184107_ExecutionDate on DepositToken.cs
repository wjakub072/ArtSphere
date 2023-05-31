using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArtSphere.Api.Migrations
{
    /// <inheritdoc />
    public partial class ExecutionDateonDepositToken : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "Amount",
                schema: "Sph",
                table: "DepositTokens",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ExecutionTime",
                schema: "Sph",
                table: "DepositTokens",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Amount",
                schema: "Sph",
                table: "DepositTokens");

            migrationBuilder.DropColumn(
                name: "ExecutionTime",
                schema: "Sph",
                table: "DepositTokens");
        }
    }
}
