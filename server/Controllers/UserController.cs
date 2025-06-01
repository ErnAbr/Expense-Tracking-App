using System.Security.Claims;
using System.Security.Cryptography;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Dtos;
using Server.Helpers;
using Server.Models;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]/auth/")]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly AuthHelper _authHelper;
        private readonly IMapper _mapper;

        public UserController(AppDbContext context, AuthHelper authHelper)
        {
            _context = context;

            _authHelper = authHelper;

            _mapper = new Mapper(new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<RegisterUserDto, User>();
            }));
        }

        [HttpPost("Register")]
        public async Task<IActionResult> RegisterUser(RegisterUserDto registerUser)
        {

            if (await _context.Users.AnyAsync(u => u.Email == registerUser.Email))
            {
                return Conflict("A user with this email already exists.");
            }

            byte[] passwordSalt = new byte[128 / 8];
            using (RandomNumberGenerator rng = RandomNumberGenerator.Create())
            {
                rng.GetNonZeroBytes(passwordSalt);
            }

            User userToAdd = _mapper.Map<User>(registerUser);
            userToAdd.PasswordHash = _authHelper.CreatePasswordHash(registerUser.Password, passwordSalt);
            userToAdd.PasswordSalt = passwordSalt;

            List<Category> globalCategories = await _context.Categories
                .Include(c => c.Subcategories)
                .Where(c => c.UserId == null)
                .ToListAsync();

            userToAdd.Categories = [.. globalCategories.Select(CategoryHelper.CloneCategory)];

            _context.Users.Add(userToAdd);
            if (await _context.SaveChangesAsync() > 0)
            {
                return Ok("Registration Successful");
            }

            return StatusCode(500, "Failed to register user due to server error.");
        }

        [HttpPost("Login")]
        public async Task<IActionResult> LoginUser(LoginUserDto loginUser)
        {
            User? user = await _context.Users.FirstOrDefaultAsync(u => u.Email == loginUser.Email);
            if (user == null)
            {
                return Unauthorized("Invalid Email or Password");
            }

            if (!_authHelper.VerifyPassword(loginUser, user))
            {
                return Unauthorized("Invalid Email or Password");
            }

            string token = _authHelper.GenerateToken(user);

            Response.Cookies.Append("jwt", token, new CookieOptions
            {
                HttpOnly = true,
                Secure = false, // true for production HTTPS
                SameSite = SameSiteMode.Strict,
                Expires = DateTimeOffset.UtcNow.AddDays(1)
            });

            return Ok("Login successful");
        }

        [HttpPost("Logout")]
        public IActionResult LogoutUser()
        {
            Response.Cookies.Delete("jwt");
            return Ok("Logged out Successfully");
        }

        [Authorize]
        [HttpGet("me")]
        public IActionResult GetCurrentUser()
        {
            if (HttpContext.User.Identity is ClaimsIdentity identity && identity.IsAuthenticated)
            {
                string? email = identity.FindFirst(ClaimTypes.Email)?.Value;
                return Ok(new { email });
            }

            return Unauthorized("Invalid Token");
        }

        [HttpGet]
        public IEnumerable<User> GetAllUsers()
        {
        var user = _context.Users.Where(u => u.Id == 1)
            .Include(u => u.Categories)
                .ThenInclude(c => c.Subcategories)
                    .ToList();

            return user;
        }
    }
}