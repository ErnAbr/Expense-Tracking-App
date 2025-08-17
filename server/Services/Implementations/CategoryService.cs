using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Dtos;
using Server.Models;
using Server.Services.Interfaces;

namespace Server.Services.Implementations
{
    public class CategoryService(AppDbContext context, IMapper mapper) : ICategoryService
    {
        private readonly AppDbContext _context = context;
        private readonly IMapper _mapper = mapper;

        public async Task<IEnumerable<Category>> GetUserCategoriesAsync(int userId)
        {
            return await _context.Categories
                .Where(c => c.UserId == userId)
                .Include(c => c.Subcategories)
                .ToListAsync();
        }

        public async Task<bool> AddUserCategoryAsync(int userId, AddCategoryDto dto)
        {
            var category = _mapper.Map<Category>(dto);
            category.UserId = userId;
            category.Subcategories = _mapper.Map<List<Subcategory>>(dto.Subcategory);

            category.Subcategories.ToList().ForEach(s =>
            {
                s.Budgets.Add(new Budget
                {
                    UserId = userId,
                    PlannedExpense = 0
                });
            });

            _context.Categories.Add(category);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<string?> UpdateUserCategoryAsync(int userId, EditCategoryDto dto)
        {
            switch (dto.Type)
            {
                case "cat":
                    Category? category = _context.Categories.SingleOrDefault(c => c.Id == dto.Id);
                    if (category == null)
                        return "Category not found";

                    if (category.UserId != userId)
                        return "Forbidden";

                    category.Name = dto.Data.Name;
                    category.IconName = dto.Data.IconName;
                    break;

                case "sub":
                    Subcategory? subcategory = _context.Subcategories
                        .Include(s => s.Category)
                        .SingleOrDefault(s => s.Id == dto.Id);

                    if (subcategory == null)
                        return "Subcategory not found";

                    if (subcategory.Category.UserId != userId)
                        return "Forbidden";

                    subcategory.Name = dto.Data.Name;
                    subcategory.IconName = dto.Data.IconName;
                    break;

                default:
                    return "Invalid type";
            }

            await _context.SaveChangesAsync();
            return null;
        }

        public async Task<string?> AddSubcategoriesToCategoryAsync(int userId, AddSubcategoriesToCategoryDto dto)
        {
            Category? category = _context.Categories
                .Include(c => c.Subcategories)
                .FirstOrDefault(c => c.Id == dto.CategoryId);

            if (category == null)
                return "Category not found";

            if (category.UserId != userId)
                return "Forbidden";

            List<Subcategory>? subcategories = _mapper.Map<List<Subcategory>>(dto.Subcategory);
            subcategories.ForEach(s =>
            {
                s.CategoryId = category.Id;
                s.Budgets.Add(new Budget
                {
                    UserId = userId,
                    PlannedExpense = 0
                });
            });

            _context.Subcategories.AddRange(subcategories);
            await _context.SaveChangesAsync();
            return null;
        }
        
        public async Task<string?> DeleteUserCategoryAsync(int userId, DeleteCategoryDto dto)
        {
            switch (dto.Type)
            {
                case "cat":
                    Category? category = _context.Categories.Find(dto.Id);
                    if (category == null)
                        return "Category not found";

                    if (category.UserId != userId)
                        return "Forbidden";

                    _context.Categories.Remove(category);
                    break;

                case "sub":
                    Subcategory? subcategory = _context.Subcategories
                        .Include(s => s.Category)
                        .SingleOrDefault(s => s.Id == dto.Id);

                    if (subcategory == null)
                        return "Subcategory not found";

                    if (subcategory.Category.UserId != userId)
                        return "Forbidden";

                    _context.Subcategories.Remove(subcategory);
                    break;

                default:
                    return "Invalid type";
            }

                await _context.SaveChangesAsync();
                return null;
        }
    }
}