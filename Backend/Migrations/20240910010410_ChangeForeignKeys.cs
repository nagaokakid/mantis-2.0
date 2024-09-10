using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class ChangeForeignKeys : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_UserTickets",
                table: "UserTickets");

            migrationBuilder.DropIndex(
                name: "IX_UserTickets_UserId",
                table: "UserTickets");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserProjects",
                table: "UserProjects");

            migrationBuilder.DropIndex(
                name: "IX_UserProjects_UserId",
                table: "UserProjects");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "UserTickets");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "UserProjects");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserTickets",
                table: "UserTickets",
                columns: new[] { "UserId", "TicketId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserProjects",
                table: "UserProjects",
                columns: new[] { "UserId", "ProjectId" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_UserTickets",
                table: "UserTickets");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserProjects",
                table: "UserProjects");

            migrationBuilder.AddColumn<string>(
                name: "Id",
                table: "UserTickets",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Id",
                table: "UserProjects",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserTickets",
                table: "UserTickets",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserProjects",
                table: "UserProjects",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_UserTickets_UserId",
                table: "UserTickets",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserProjects_UserId",
                table: "UserProjects",
                column: "UserId");
        }
    }
}
