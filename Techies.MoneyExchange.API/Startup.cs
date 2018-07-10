using System;
using System.IdentityModel.Tokens.Jwt;
using System.Reflection;
using System.Text;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Techies.MoneyExchange.API.Data;
using Techies.MoneyExchange.API.ExceptionHandling;
using Techies.MoneyExchange.Infrastructure.Persistence.EF.Core;

namespace Techies.MoneyExchange.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            // ===== Add our DbContexts ========
            services.AddDbContext<MoneyExchangeDbContext>(opt=> opt.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            services.AddDbContext<ApplicationDbContext>(opt=> opt.UseSqlServer(Configuration.GetConnectionString("SecurityConnection")));
            
            // ===== Add Identity ========
            services.AddIdentity<IdentityUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();
            
            // ===== Add Jwt Authentication ========
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear(); // => remove default claims
            services
                .AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                    
                })
                .AddJwtBearer(cfg =>
                {
                    cfg.RequireHttpsMetadata = false;
                    cfg.SaveToken = true;
                    cfg.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidIssuer = Configuration["JwtIssuer"],
                        ValidAudience = Configuration["JwtIssuer"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JwtKey"])),
                        ClockSkew = TimeSpan.Zero // remove delay of token when expire
                    };
                });

            // ===== Add MVC ========
            services.AddMvc();

            // ===== Add CORS
            services.AddCors();

            var builder = new ContainerBuilder();
            builder.Populate(services);

            // ===== Add Application Services ========
            builder.RegisterAssemblyTypes(Assembly.Load("Techies.MoneyExchange.Application"))
                .Where(x => x.Name.EndsWith("Service")).AsSelf().InstancePerLifetimeScope();

            builder.RegisterType<ExchangeDataSeed>();

            return new AutofacServiceProvider(builder.Build());
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(
            IApplicationBuilder app, 
            IHostingEnvironment env,
            ApplicationDbContext dbContext
        )
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

                // ==== Migrate and initialize Seed Data ====
                using (var serviceScope = app.ApplicationServices.CreateScope())
                {
                    var scopeServiceProvider = serviceScope.ServiceProvider;
                    var db = scopeServiceProvider.GetService<ExchangeDataSeed>();
                    db.Initialize().Wait();
                }
            }
            else
            {                
                // ===== API Errors Handling
                app.UseMiddleware<TechiesExceptionHandlerMiddleware>();
            }

            // ===== Use CORS ======
            app.UseCors(builder => builder.WithOrigins(Configuration.GetValue<string>("CorsPolicy:Origin")));

            // ===== Use Authentication ======
            app.UseAuthentication();
            app.UseMvc();
        }
    }
}
