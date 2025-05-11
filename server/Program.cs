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

//test data seed
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    context.Users.Add(new User
    {
        Email = "test@example.com",
        Password = "password123",
        Gender = "Male",
        Country = "USA",
        BirthDate = new DateTime(2000, 1, 1)
    });

    context.Users.Add(new User
    {
        Email = "test2@example.com",
        Password = "password123",
        Gender = "Female",
        Country = "RU",
        BirthDate = new DateTime(2000, 1, 1)
    });

    context.SaveChanges();
}
//test data seed

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


