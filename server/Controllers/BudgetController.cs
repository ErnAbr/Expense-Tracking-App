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
        public ActionResult<List<Budget>> GetUserBudgetData(int year, int month)
        {
            ActionResult<int> userIdResult = GetUserIdFromClaims();
            if (userIdResult.Result != null)
                return userIdResult.Result;

            List<Budget>? userBudgets = _context.Budgets
                .Where(b => b.UserId == userIdResult.Value &&
                            b.PlannedExpenseDate.Year == year &&
                            b.PlannedExpenseDate.Month == month)
                .ToList();

            if (userBudgets == null)
                return NotFound("User Budget Data Not Found");

            List<BudgetResponseDto> userBudgetDtos = _mapper.Map<List<BudgetResponseDto>>(userBudgets);

            return Ok(userBudgetDtos);
        }

        [Authorize]
        [HttpPut("ChangeSubcategoryBudget")]
        public IActionResult AddSubcategoryBudget(AddSubcategoryBudgetDto dto)
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
                .FirstOrDefault(b =>
                    b.SubcategoryId == dto.SubcategoryId &&
                    b.UserId == userIdResult.Value &&
                    b.PlannedExpenseDate.Year == dto.PlannedExpenseDate.Year &&
                    b.PlannedExpenseDate.Month == dto.PlannedExpenseDate.Month);

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

            return Ok("Budget Updated");
        }
    }
}