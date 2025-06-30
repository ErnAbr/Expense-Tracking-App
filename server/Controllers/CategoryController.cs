using System.Security.Claims;
using AutoMapper;
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
    public class CategoryController(AppDbContext context, IMapper mapper) : BaseController
    {
        private readonly AppDbContext _context = context;
        private readonly IMapper _mapper = mapper;

        [Authorize]
        [HttpGet("GetAllCategories")]
        public ActionResult<IEnumerable<Category>> UserCategories()
        {
            ActionResult<int> userIdResult = GetUserIdFromClaims();
                if (userIdResult.Result != null)
                    return userIdResult.Result;

            int userId = userIdResult.Value;

            return _context.Categories
                        .Where(c => c.UserId == userId)
                        .Include(c => c.Subcategories)
                        .ToList();
        }

        [Authorize]
        [HttpPost("AddUserCategory")]
        public IActionResult AddUserCategory(AddCategoryDto addCategoryDto)
        {
            ActionResult<int> userIdResult = GetUserIdFromClaims();
                if (userIdResult.Result != null)
                    return userIdResult.Result;

            Category categoryToAdd = _mapper.Map<Category>(addCategoryDto);
            categoryToAdd.Subcategories = _mapper.Map<List<Subcategory>>(addCategoryDto.Subcategory);
            categoryToAdd.UserId = userIdResult.Value;

            _context.Categories.Add(categoryToAdd);

            if (_context.SaveChanges() > 0)
            {
                return Ok("Category Successfully Added");
            }

            return StatusCode(500, "Failed to add category due to server error.");
        }

        [Authorize]
        [HttpPut("UpdateUserCategory")]
        public IActionResult UpdateUserCategory(EditCategoryDto dto)
        {
            ActionResult<int> userIdResult = GetUserIdFromClaims();
            if (userIdResult.Result != null) return userIdResult.Result;
            
            int userId = userIdResult.Value;

            switch (dto.Type)
            {
                case "cat":
                    Category? category = _context.Categories.SingleOrDefault(c => c.Id == dto.Id);
                    if (category == null)
                        return NotFound("Category not found");

                    if (category.UserId != userId)
                        return Forbid("You do not own this category");

                    category.Name = dto.Data.Name;
                    category.IconName = dto.Data.IconName;
                    break;

                case "sub":
                    Subcategory? subcategory = _context.Subcategories
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
        [HttpDelete("DeleteUserCategory")]
        public IActionResult DeleteUserCategory(DeleteCategoryDto dto)
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
    }
}