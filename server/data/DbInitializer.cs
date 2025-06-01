using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using Server.Helpers;
using Server.Models;

namespace Server.Data
{
    public static class DbInitializer
    {
        public static void Initialize(AppDbContext context, AuthHelper authHelper)
        {
            context.Database.EnsureCreated();

            if (!context.Categories.Any(c => c.UserId == null))
            {
                var entertainment = new Category
                {
                    Name = "Entertainment",
                    IconName = "MdMovie",
                    Subcategories = new List<Subcategory>
                    {
                        new Subcategory { Name = "Movies", IconName = "MdTheaters" },
                        new Subcategory { Name = "Concerts", IconName = "MdMusicNote" },
                        new Subcategory { Name = "Games", IconName = "MdSportsEsports" }
                    }
                };

                var foodAndDrinks = new Category
                {
                    Name = "Food & Drinks",
                    IconName = "MdFastfood",
                    Subcategories = new List<Subcategory>
                    {
                        new Subcategory { Name = "Restaurants", IconName = "MdRestaurant" },
                        new Subcategory { Name = "Groceries", IconName = "MdLocalGroceryStore" },
                        new Subcategory { Name = "Coffee", IconName = "MdCoffee" }
                    }
                };

                var housing = new Category
                {
                    Name = "Housing",
                    IconName = "MdHome",
                    Subcategories = new List<Subcategory>
                    {
                        new Subcategory { Name = "Rent", IconName = "MdDomain" },
                        new Subcategory { Name = "Utilities", IconName = "MdElectricBolt" },
                        new Subcategory { Name = "Maintenance", IconName = "MdBuild" }
                    }
                };

                var lifestyle = new Category
                {
                    Name = "Lifestyle",
                    IconName = "MdStyle",

                    Subcategories = new List<Subcategory>
                    {
                        new Subcategory { Name = "Gym", IconName = "MdFitnessCenter" },
                        new Subcategory { Name = "Spa", IconName = "MdSpa" },
                        new Subcategory { Name = "Shopping", IconName = "MdShoppingBag" }
                    }
                };

                var transportation = new Category
                {
                    Name = "Transportation",
                    IconName = "MdCommute",
                    Subcategories = new List<Subcategory>
                    {
                        new Subcategory { Name = "Public Transport", IconName = "MdDirectionsBus" },
                        new Subcategory { Name = "Gas", IconName = "MdLocalGasStation" },
                        new Subcategory { Name = "Taxi", IconName = "MdLocalTaxi" }
                    }
                };

                context.Categories.AddRange(entertainment, foodAndDrinks, housing, lifestyle, transportation);
                context.SaveChanges();
            }

            if (!context.Users.Any())
            {
                var globalCategories = context.Categories
                    .Where(c => c.UserId == null)
                    .Include(c => c.Subcategories)
                    .ToList();

                byte[] salt1 = new byte[16];
                RandomNumberGenerator.Fill(salt1);

                var user1 = new User
                {
                    Email = "test@example.com",
                    PasswordSalt = salt1,
                    PasswordHash = authHelper.CreatePasswordHash("password123", salt1),
                    Gender = "Male",
                    Country = "LT",
                    BirthDate = new DateTime(2000, 1, 1),
                    Categories = [.. globalCategories.Select(CategoryHelper.CloneCategory)]
                };

                byte[] salt2 = new byte[16];
                RandomNumberGenerator.Fill(salt2);

                var user2 = new User
                {
                    Email = "test2@example.com",
                    PasswordSalt = salt2,
                    PasswordHash = authHelper.CreatePasswordHash("password123", salt2),
                    Gender = "Female",
                    Country = "PL",
                    BirthDate = new DateTime(2000, 1, 1),
                    Categories = [.. globalCategories.Select(CategoryHelper.CloneCategory)]
                };

                context.Users.AddRange(user1, user2);
                context.SaveChanges();
            }

        }
        
    }
}
