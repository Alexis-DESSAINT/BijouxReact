using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace BijouxShop.Api.Data;

public class DesignTimeBijouxShopContextFactory : IDesignTimeDbContextFactory<BijouxShopContext>
{
    public BijouxShopContext CreateDbContext(string[] args)
    {
        var configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json")
            .Build();

        var optionsBuilder = new DbContextOptionsBuilder<BijouxShopContext>();
        optionsBuilder.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));

        return new BijouxShopContext(optionsBuilder.Options);
    }
}