using System.Security.Cryptography;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//for Testing
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseInMemoryDatabase("TestDb"));

builder.Services.AddCors((options) =>
    {
        options.AddPolicy("DevCors", (corsBuilder) =>
            {
                corsBuilder.WithOrigins("http://localhost:4200", "http://localhost:3000", "http://localhost:8000")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials();
            });
        options.AddPolicy("ProdCors", (corsBuilder) =>
            {
                corsBuilder.WithOrigins("https://myProductionSite.com")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials();
            });
    });

var app = builder.Build();

// test data seed
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    void CreatePasswordHash(string password, out byte[] hash, out byte[] salt)
    {
        using var hmac = new HMACSHA512();
        salt = hmac.Key;
        hash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
    }

    CreatePasswordHash("password123", out byte[] hash1, out byte[] salt1);
    CreatePasswordHash("password123", out byte[] hash2, out byte[] salt2);

    context.Users.Add(new User
    {
        Email = "test@example.com",
        PasswordHash = hash1,
        PasswordSalt = salt1,
        Gender = "Male",
        Country = "USA",
        BirthDate = new DateTime(2000, 1, 1)
    });

    context.Users.Add(new User
    {
        Email = "test2@example.com",
        PasswordHash = hash2,
        PasswordSalt = salt2,
        Gender = "Female",
        Country = "RU",
        BirthDate = new DateTime(2000, 1, 1)
    });

    context.SaveChanges();
}
// test data seed

if (app.Environment.IsDevelopment())
{
    app.UseCors("DevCors");
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseCors("ProdCors");
    app.UseHttpsRedirection();
}

app.MapControllers();

app.Run();


