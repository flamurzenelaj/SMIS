using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SMIS_API.Migrations
{
    public partial class IntialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Clas",
                table: "Subject");

            migrationBuilder.CreateTable(
                name: "Chatbot",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Question = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Response = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Chatbot", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Chatbot");

            migrationBuilder.AddColumn<string>(
                name: "Clas",
                table: "Subject",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
