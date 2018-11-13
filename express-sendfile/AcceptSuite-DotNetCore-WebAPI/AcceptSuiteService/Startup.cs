using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;


namespace AcceptSuiteService
{
	public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
	        services.AddCors();
			services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {

	        app.UseCors(builder => builder
		        .AllowAnyOrigin()
		        .AllowAnyMethod()
		        .AllowAnyHeader()
		        .AllowCredentials());


			//app.UseCors(builder =>
			// builder.WithOrigins("https://10.173.198.59:5008")
			//  .AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod().AllowCredentials()
			//);

			//app.UseCors("AllowAllOrigins");

			if (env.IsDevelopment())
	        {
		        app.UseDeveloperExceptionPage();
	        }




			app.UseMvc();
			
        }
    }
}
