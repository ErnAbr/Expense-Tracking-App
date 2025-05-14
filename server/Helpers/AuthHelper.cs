using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Server.Dtos;
using Server.Models;

namespace Server.Helpers
{
    public class AuthHelper
    {
        private readonly IConfiguration _config;
        public AuthHelper(IConfiguration config)
        {
            _config = config;
        }

        public byte[] CreatePasswordHash(string password, byte[] passwordSalt)
        {
            string passwordSaltPlusString = _config.GetSection("AppSettings:PasswordKey").Value
                + Convert.ToBase64String(passwordSalt);

            return KeyDerivation.Pbkdf2(
                password: password,
                salt: Encoding.ASCII.GetBytes(passwordSaltPlusString),
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 1000000,
                numBytesRequested: 256 / 8
            );
        }

        public bool VerifyPassword(LoginUserDto loginUser, User user)
        {
            byte[] passwordHash = CreatePasswordHash(loginUser.Password, user.PasswordSalt);

            Console.WriteLine("Generated Hash: " + Convert.ToBase64String(passwordHash));
            Console.WriteLine("Stored Hash:    " + Convert.ToBase64String(user.PasswordHash));

            return CryptographicOperations.FixedTimeEquals(passwordHash, user.PasswordHash);
        }

        public string GenerateToken(User user)
        {
            Claim[] claims =
            [
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.DateOfBirth, user.BirthDate.ToString("yyyy-MM-dd"))
            ];

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();

            SymmetricSecurityKey tokenKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes
                (_config.GetSection("AppSettings:TokenKey").Value ??
                    throw new InvalidOperationException("TokenKey not configured in appsettings.")));

            SigningCredentials credentials = new SigningCredentials(tokenKey, SecurityAlgorithms.HmacSha512Signature);

            SecurityTokenDescriptor descriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(claims),
                SigningCredentials = credentials,
                Expires = DateTime.UtcNow.AddDays(1)
            };

            SecurityToken token = tokenHandler.CreateToken(descriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}