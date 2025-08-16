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
    public class BudgetController(AppDbContext context, IMapper mapper) : BaseController
    {
        private readonly AppDbContext _context = context;
        private readonly IMapper _mapper = mapper;

        [Authorize]
        [HttpGet("UserBudgetData")]
        public ActionResult<List<Budget>> GetUserBudgetData()
        {
            ActionResult<int> userIdResult = GetUserIdFromClaims();
            if (userIdResult.Result != null)
                return userIdResult.Result;

            List<Budget>? userBudget = _context.Budgets
                .Where(b => b.UserId == userIdResult.Value)
                .ToList();

            if (userBudget == null)
                return NotFound("User Budget Data Not Found");

            return Ok(userBudget);
        }

        [Authorize]
        [HttpPut("ChangeSubcategoryBudget")]
        public ActionResult<List<Budget>> AddSubcategoryBudget(AddSubcategoryBudgetDto dto)
        {
            ActionResult<int> userIdResult = GetUserIdFromClaims();
            if (userIdResult.Result != null)
                return userIdResult.Result;

            Subcategory? subcategory = _context.Subcategories
                .Include(s => s.Category) 
                .FirstOrDefault(s => s.Id == dto.SubcategoryId);

            if (subcategory == null)
                return NotFound("Subcategory not found");

            if (subcategory.Category.UserId != userIdResult.Value)
                return Forbid("You do not own this subcategory");

            Budget? existingBudget = _context.Budgets
                .FirstOrDefault(b => b.SubcategoryId == dto.SubcategoryId
                    && b.UserId == userIdResult.Value);

            if (existingBudget != null)
            {
                existingBudget.PlannedExpense = dto.PlannedExpense;
            }
            else
            {
                Budget budgetToAdd = _mapper.Map<Budget>(dto);
                budgetToAdd.UserId = userIdResult.Value;
                _context.Budgets.Add(budgetToAdd);
            }

            _context.SaveChanges();

            return NoContent();
        }
    }
}