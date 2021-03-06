using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Techies.MoneyExchange.API.Data
{
    // Add profile data for application users by adding properties to the ApplicationUser class
    public class ApplicationUser : IdentityUser
    {
        public ApplicationUser()
        {
        }

        public ApplicationUser(string username)
        {
            UserName = username;
            NormalizedEmail = username.ToUpperInvariant();
            Email = username;
            NormalizedEmail = username.ToUpperInvariant();
        }
    }
}
