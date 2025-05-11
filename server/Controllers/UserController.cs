using System.Security.Cryptography;
using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Dto;
using Server.Models;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public UserController(AppDbContext context)
        {
            _context = context;

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

            CreatePasswordHash(registerUser.Password, out byte[] passwordHash, out byte[] passwordSalt);

            User userToAdd = _mapper.Map<User>(registerUser);
            userToAdd.PasswordHash = passwordHash;
            userToAdd.PasswordSalt = passwordSalt;

            _context.Users.Add(userToAdd);
            if (await _context.SaveChangesAsync() > 0)
            {
                return Ok();
            }

            return StatusCode(500, "Failed to register user due to server error.");
        }

        [HttpGet]
        public IEnumerable<User> GetAllUsers()
        {
            return _context.Users.ToList();
        }

        private static void CreatePasswordHash(string password, out byte[] hash, out byte[] salt)
        {
            using var hmac = new HMACSHA512();
            salt = hmac.Key;
            hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        }

        public static bool VerifyPassword(string enteredPassword, string storedHash, string storedSalt)
        {
            var saltBytes = Convert.FromBase64String(storedSalt);

            using var pbkdf2 = new Rfc2898DeriveBytes(
                password: enteredPassword,
                salt: saltBytes,
                iterations: 100000,
                hashAlgorithm: HashAlgorithmName.SHA256);

            var enteredHash = pbkdf2.GetBytes(32); 

            return Convert.ToBase64String(enteredHash) == storedHash;
        }
    }
}

