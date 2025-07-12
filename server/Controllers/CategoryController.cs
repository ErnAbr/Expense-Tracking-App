using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Dtos;
using Server.Models;
using Server.Services.Interfaces;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoryController(ICategoryService service) : BaseController
    {
        private readonly ICategoryService _service = service;

        [Authorize]
        [HttpGet("GetAllCategories")]
        public async Task<IActionResult> UserCategories()
        {
            ActionResult<int> userIdResult = GetUserIdFromClaims();
            if (userIdResult.Result != null)
                return userIdResult.Result;

            IEnumerable<Category> categories = await _service.GetUserCategoriesAsync(userIdResult.Value);
            return Ok(categories);
        }

        [Authorize]
        [HttpPost("AddUserCategory")]
        public async Task<IActionResult> AddUserCategory(AddCategoryDto addCategoryDto)
        {
            ActionResult<int> userIdResult = GetUserIdFromClaims();
            if (userIdResult.Result != null)
                return userIdResult.Result;

            bool result = await _service.AddUserCategoryAsync(userIdResult.Value, addCategoryDto);
            return result ? Ok("Category Successfully Added") : StatusCode(500, "Failed to add category.");
        }

        [Authorize]
        [HttpPut("UpdateUserCategory")]
        public async Task<IActionResult> UpdateUserCategory(EditCategoryDto editCategoryDto)
        {
            ActionResult<int> userIdResult = GetUserIdFromClaims();
                if (userIdResult.Result != null) 
                    return userIdResult.Result;

            string? result = await _service.UpdateUserCategoryAsync(userIdResult.Value, editCategoryDto);

            return result switch
            {
                null => Ok("Update successful"),
                "Forbidden" => Forbid("You do not own this resource"),
                "Invalid type" => BadRequest(result),
                _ => NotFound(result)
            };
        }

        [Authorize]
        [HttpPut("AddSubcategoryToExistingCategory")]
        public async Task<IActionResult> AddSubcategoryToExistingCategory(AddSubcategoriesToCategoryDto subcategoryAddDto)
        {
            ActionResult<int> userIdResult = GetUserIdFromClaims();
            if (userIdResult.Result != null)
                return userIdResult.Result;

            string? result = await _service.AddSubcategoriesToCategoryAsync(userIdResult.Value, subcategoryAddDto);
            return result == null ? Ok("Subcategories successfully added to category") : StatusCode(403, result);
        }


        [Authorize]
        [HttpDelete("DeleteUserCategory")]
        public async Task<IActionResult> DeleteUserCategory(DeleteCategoryDto deleteCategoryDto)
        {
            ActionResult<int> userIdResult = GetUserIdFromClaims();
            if (userIdResult.Result != null)
                return userIdResult.Result;

            string? result = await _service.DeleteUserCategoryAsync(userIdResult.Value, deleteCategoryDto);
            return result switch
            {
                null => Ok("Deleted successfully"),
                "Forbidden" => Forbid("You do not own this resource"),
                "Invalid type" => BadRequest(result),
                _ => NotFound(result)
            };
        }
    }
}