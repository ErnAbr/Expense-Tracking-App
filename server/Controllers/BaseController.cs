using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [ApiController]
    public abstract class BaseController : ControllerBase
    {
        protected ActionResult<int> GetUserIdFromClaims()
        {
            string? userId = User.Claims
                .FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
                return Unauthorized("Invalid Token");

            return int.Parse(userId);
        }
    }
}