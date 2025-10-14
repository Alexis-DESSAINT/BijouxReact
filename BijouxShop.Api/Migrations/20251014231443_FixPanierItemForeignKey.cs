using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BijouxShop.Api.Migrations
{
    /// <inheritdoc />
    public partial class FixPanierItemForeignKey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PanierItems_Gravures_GravureId",
                table: "PanierItems");

            migrationBuilder.DropForeignKey(
                name: "FK_PanierItems_Paniers_PanierId",
                table: "PanierItems");

            migrationBuilder.DropForeignKey(
                name: "FK_Paniers_Clients_ClientId",
                table: "Paniers");

            migrationBuilder.DropIndex(
                name: "IX_Paniers_ClientId",
                table: "Paniers");

            migrationBuilder.DropIndex(
                name: "IX_PanierItems_GravureId",
                table: "PanierItems");

            migrationBuilder.DropColumn(
                name: "ClientId",
                table: "Paniers");

            migrationBuilder.DropColumn(
                name: "GravureId",
                table: "PanierItems");

            migrationBuilder.AlterColumn<string>(
                name: "Nom",
                table: "Variantes",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<DateTime>(
                name: "DateCreation",
                table: "Paniers",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AlterColumn<int>(
                name: "PanierId",
                table: "PanierItems",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_PanierItems_Paniers_PanierId",
                table: "PanierItems",
                column: "PanierId",
                principalTable: "Paniers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PanierItems_Paniers_PanierId",
                table: "PanierItems");

            migrationBuilder.DropColumn(
                name: "DateCreation",
                table: "Paniers");

            migrationBuilder.AlterColumn<string>(
                name: "Nom",
                table: "Variantes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ClientId",
                table: "Paniers",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "PanierId",
                table: "PanierItems",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "GravureId",
                table: "PanierItems",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Paniers_ClientId",
                table: "Paniers",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_PanierItems_GravureId",
                table: "PanierItems",
                column: "GravureId");

            migrationBuilder.AddForeignKey(
                name: "FK_PanierItems_Gravures_GravureId",
                table: "PanierItems",
                column: "GravureId",
                principalTable: "Gravures",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PanierItems_Paniers_PanierId",
                table: "PanierItems",
                column: "PanierId",
                principalTable: "Paniers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Paniers_Clients_ClientId",
                table: "Paniers",
                column: "ClientId",
                principalTable: "Clients",
                principalColumn: "Id");
        }
    }
}
