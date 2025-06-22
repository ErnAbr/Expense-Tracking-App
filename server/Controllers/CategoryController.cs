using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Dtos;
using Server.Models;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly AppDbContext _context;
        public CategoryController(AppDbContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet("GetAllCategories")]
        public ActionResult<IEnumerable<Category>> UserCategories()
        {
            ActionResult<int> userIdResult = GetUserIdFromClaims();
            if (userIdResult.Result != null) return userIdResult.Result;

            int userId = userIdResult.Value;

            return _context.Categories
                        .Where(c => c.UserId == userId)
                        .Include(c => c.Subcategories)
                        .ToList();
        }

        [Authorize]
        [HttpPut("UpdateUserCategories")]
        public IActionResult UpdateUserCategories(EditCategoryDto dto)
        {
            ActionResult<int> userIdResult = GetUserIdFromClaims();
            if (userIdResult.Result != null) return userIdResult.Result;
            
            int userId = userIdResult.Value;

            switch (dto.Type)
            {
                case "cat":
                    var category = _context.Categories.SingleOrDefault(c => c.Id == dto.Id);
                    if (category == null)
                        return NotFound("Category not found");

                    if (category.UserId != userId)
                        return Forbid("You do not own this category");

                    category.Name = dto.Data.Name;
                    category.IconName = dto.Data.IconName;
                    break;

                case "sub":
                    var subcategory = _context.Subcategories
                        .Include(s => s.Category)
                        .SingleOrDefault(s => s.Id == dto.Id);

                    if (subcategory == null)
                        return NotFound("Subcategory not found");

                    if (subcategory.Category.UserId != userId)
                        return Forbid("You do not own this subcategory");

                    subcategory.Name = dto.Data.Name;
                    subcategory.IconName = dto.Data.IconName;
                    break;

                default:
                    return BadRequest("Invalid type");
            }

            _context.SaveChanges();
            return Ok("Update successful");
        }

        [Authorize]
        [HttpDelete("DeleteCatOrSub")]
        public IActionResult DeleteUserCatOrSub(DeteleCategoryDto dto)
        {
            ActionResult<int> userIdResult = GetUserIdFromClaims();
            if (userIdResult.Result != null) return userIdResult.Result;
            
            int userId = userIdResult.Value;

            switch (dto.Type)
            {
                case "cat":
                    var category = _context.Categories.Find(dto.Id);
                    if (category == null)
                        return NotFound("Category not found");

                    if (category.UserId != userId)
                        return Forbid("You do not own this category");

                    _context.Categories.Remove(category);
                    break;

                case "sub":
                    var subcategory = _context.Subcategories
                        .Include(s => s.Category)
                        .SingleOrDefault(s => s.Id == dto.Id);

                    if (subcategory == null)
                        return NotFound("Subcategory not found");

                    if (subcategory.Category.UserId != userId)
                        return Forbid("You do not own this subcategory");

                    _context.Subcategories.Remove(subcategory);
                    break;

                default:
                    return BadRequest("Invalid type");
            }

            _context.SaveChanges();
            return Ok("Deleted successfully");
        }

        private ActionResult<int> GetUserIdFromClaims()
        {
            string? userId = HttpContext.User.Claims
                .FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
                return Unauthorized("Invalid Token");

            return int.Parse(userId);
        }
    }
}