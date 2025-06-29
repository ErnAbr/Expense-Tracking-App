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
    }
}