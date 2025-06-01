using System.Collections;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
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
    }
}