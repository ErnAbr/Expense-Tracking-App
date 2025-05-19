using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Server.Data;
using Server.Helpers;
using Server.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<AuthHelper>();

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

SymmetricSecurityKey tokenKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes
    (builder.Configuration.GetSection("AppSettings:TokenKey").Value ??
         throw new InvalidOperationException("TokenKey not configured in appsettings.")));

TokenValidationParameters tokenValidationParameters = new TokenValidationParameters()
{
    IssuerSigningKey = tokenKey,
    ValidateIssuerSigningKey = true,
    ValidIssuer = "AppSettings:Issuer",
    ValidAudience = "AppSettings:Audience",
};

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = tokenValidationParameters;

        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                var token = context.Request.Cookies["jwt"];
                if (!string.IsNullOrEmpty(token))
                {
                    context.Token = token;
                }
                return Task.CompletedTask;
            }
        };
    });

var app = builder.Build();

// test data seed - start
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    var authHelper = scope.ServiceProvider.GetRequiredService<AuthHelper>();

    byte[] salt1 = new byte[128 / 8];
    RandomNumberGenerator.Fill(salt1);

    var user = new User
    {
        Email = "test@example.com",
        PasswordSalt = salt1,
        PasswordHash = authHelper.CreatePasswordHash("password123", salt1),
        Gender = "Male",
        Country = "USA",
        BirthDate = new DateTime(2000, 1, 1)
    };

    byte[] salt2 = new byte[128 / 8];
    RandomNumberGenerator.Fill(salt2);

    var user2 = new User
    {
        Email = "test2@example.com",
        PasswordSalt = salt2,
        PasswordHash = authHelper.CreatePasswordHash("password123", salt2),
        Gender = "Female",
        Country = "RU",
        BirthDate = new DateTime(2000, 1, 1)
    };

    context.Users.AddRange(user, user2);
    context.SaveChanges();
}
// test data seed - end

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

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();


