using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BijouxShop.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddImageUrlToVariante : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Variantes",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Variantes");
        }
    }
}
