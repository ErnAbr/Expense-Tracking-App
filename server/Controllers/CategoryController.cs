using System.Collections;
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
            string? userId = HttpContext.User.Claims
                .FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;


            if (userId == null)
            {
                return Unauthorized("Invalid Token");
            }

            return _context.Categories
                        .Where(c => c.UserId == int.Parse(userId))
                        .Include(c => c.Subcategories)
                        .ToList();
        }

        [Authorize]
        [HttpDelete("DeleteCatOrSub")]
        public IActionResult DeleteUserCatOrSub([FromBody] DeteleCategoryDto dto)
        {
            if (dto.Type == "cat")
            {
                Category? categoryToDelete = _context.Categories.Find(dto.Id);
                if (categoryToDelete == null)
                    return NotFound("Category not found");

                _context.Categories.Remove(categoryToDelete);
            }
            else if (dto.Type == "sub")
            {
                Subcategory? subcategoryToDelete = _context.Subcategories.Find(dto.Id);
                if (subcategoryToDelete == null)
                    return NotFound("Subcategory not found");

                _context.Subcategories.Remove(subcategoryToDelete);
            }
            else
            {
                return BadRequest("Invalid type");
            }

            _context.SaveChanges();
            return Ok("Deleted successfully");
        }
    }
}