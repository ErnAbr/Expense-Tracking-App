using Server.Dtos;
using Server.Models;

namespace Server.Services.Interfaces
{
    public interface ICategoryService
    {
        Task<IEnumerable<Category>> GetUserCategoriesAsync(int userId);
        Task<bool> AddUserCategoryAsync(int userId, AddCategoryDto dto);
        Task<string?> UpdateUserCategoryAsync(int userId, EditCategoryDto dto);
        Task<string?> AddSubcategoriesToCategoryAsync(int userId, AddSubcategoriesToCategoryDto dto);
        Task<string?> DeleteUserCategoryAsync(int userId, DeleteCategoryDto dto);
    }
}