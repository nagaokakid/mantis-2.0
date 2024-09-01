using Backend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Backend
{

    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowOrigins", builder =>
                {
                    builder.WithOrigins("http://localhost:5173", 
                        "https://localhost:5173", 
                        "https://mantis-20-frontend-plzzn2typ-nagaokakids-projects.vercel.app/")
                    .AllowAnyHeader()
                    .AllowAnyMethod();
                });
            });

            string connectionString;

            if (!string.IsNullOrEmpty(Environment.GetEnvironmentVariable("DB_HOST"))) // if running on deployment server...
            {
                // use environment variables for db connection string
                connectionString =
                    $"Host={Environment.GetEnvironmentVariable("DB_HOST")};" +
                    $"Port={Environment.GetEnvironmentVariable("DB_PORT")};" +
                    $"Database={Environment.GetEnvironmentVariable("DB_NAME")};" +
                    $"Username={Environment.GetEnvironmentVariable("DB_USERNAME")};" +
                    $"Password={Environment.GetEnvironmentVariable("DB_API_KEY")}";
            }
            else 
            {
                // use secrets.json for local
                connectionString = builder.Configuration.GetConnectionString("WebApiDatabase");
            }


            // Add Postgres database context
            builder.Services.AddDbContext<AppDbContext>(options => options.UseNpgsql(connectionString));

            // Add controllers to the container
            builder.Services.AddControllers();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();


            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors("AllowOrigins");

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}