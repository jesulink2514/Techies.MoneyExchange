using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Techies.MoneyExchange.API.Data;
using Techies.MoneyExchange.API.Extensions;
using Techies.MoneyExchange.API.Models;

namespace Techies.MoneyExchange.API.Controllers
{
    public class TokenController : Controller
    {
        private readonly JwtSettings _settings;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public TokenController(
            IOptions<JwtSettings> settings,
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
        {
            _settings = settings.Value;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("token")]
        public async Task<IActionResult> Post([FromBody]LoginModel loginViewModel)
        {
            if (ModelState.IsValid)
            {
                var result = await _signInManager.PasswordSignInAsync(loginViewModel.Username, loginViewModel.Password,false,true);
                if (!result.Succeeded)
                {
                    return BadRequest();
                }
                
                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, loginViewModel.Username),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };

                var token = new JwtSecurityToken
                (
                    issuer: _settings.JwtIssuer,
                    audience: _settings.JwtIssuer,
                    claims: claims,
                    expires: DateTime.UtcNow.AddDays(60),
                    notBefore: DateTime.UtcNow,
                    signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_settings.JwtKey)),
                        SecurityAlgorithms.HmacSha256)
                );

                return Ok(new { token = new JwtSecurityTokenHandler().WriteToken(token) });
            }

            return BadRequest();
        }
    }
}
