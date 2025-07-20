using System.Text.Json;
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
    public class ExpenseController(AppDbContext context, IMapper mapper) : BaseController
    {
        private readonly AppDbContext _context = context;
        private readonly IMapper _mapper = mapper;

        [Authorize]
        [HttpPost("AddUserExpense")]
        public IActionResult AddUserExpense(AddExpenseDto expenseDto)
        {
            ActionResult<int> userIdResult = GetUserIdFromClaims();
            if (userIdResult.Result != null)
                return userIdResult.Result;

            Subcategory? subcategory = _context.Subcategories
                .Include(s => s.Category)
                .FirstOrDefault(s => s.Id == expenseDto.SubcategoryId);

            if (subcategory == null)
                return NotFound("Subcategory not found");

            if (subcategory.Category.UserId != userIdResult.Value)
                return Forbid("You do not own this subcategory");

            Expense expenseToAdd = _mapper.Map<Expense>(expenseDto);
            expenseToAdd.UserId = userIdResult.Value;

            _context.Expenses.Add(expenseToAdd);

            if (_context.SaveChanges() > 0)
            {
                return Ok("Expense Successfully Added");
            }

            return StatusCode(500, "Failed to add expense due to server error.");
        }

        [Authorize]
        [HttpGet("GetMonthlyExpense")]
        public ActionResult<IEnumerable<MontlyExpenseResponseDto>> GetExpensesByMonth(int year, int month)
        {
            ActionResult<int> userIdResult = GetUserIdFromClaims();
            if (userIdResult.Result != null)
                return userIdResult.Result;

            List<Expense> expenses = _context.Expenses
                .Where(e => e.UserId == userIdResult.Value &&
                            e.AmountDate.ToLocalTime().Year == year &&
                            e.AmountDate.ToLocalTime().Month == month)
                .Include(e => e.Subcategory)
                    .ThenInclude(c => c.Category)
                .ToList();


            List<MontlyExpenseResponseDto> expenseDtos = _mapper.Map<List<MontlyExpenseResponseDto>>(expenses);

            return Ok(expenseDtos);
        }

        [Authorize]
        [HttpDelete("DeleteExpense")]
        public IActionResult DeleteExpense(int expenseId)
        {
            ActionResult<int> userIdResult = GetUserIdFromClaims();
            if (userIdResult.Result != null)
                return userIdResult.Result;

            Expense? expenseToDelete = _context.Expenses.Find(expenseId);
            if (expenseToDelete == null)
                return Forbid("You do not own this expense.");

            if (expenseToDelete.UserId != userIdResult.Value)
                return Forbid("You do not own this expense.");

            _context.Expenses.Remove(expenseToDelete);
            _context.SaveChanges();

            return Ok("Expense deleted successfully");
        }
    }
}