using BijouxShop.Api.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container - TOUT DOIT ÊTRE ICI AVANT builder.Build()
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers(); // <- Déplacé ici

// CORS pour permettre les appels depuis React
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

builder.Services.AddDbContext<BijouxShopContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseStaticFiles();
app.UseHttpsRedirection();
app.UseCors("ReactApp"); // <- Ajouté pour React
app.UseAuthorization();

// Minimal API endpoints
var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
});

app.MapPost("/variantes/{id}/image", async (int id, IFormFile file, BijouxShopContext db, IWebHostEnvironment env) =>
{
    var variante = await db.Variantes.FindAsync(id);
    if (variante == null) return Results.NotFound();

    var uploads = Path.Combine(env.WebRootPath, "images", "variantes");
    Directory.CreateDirectory(uploads);

    var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
    var filePath = Path.Combine(uploads, fileName);

    using (var stream = new FileStream(filePath, FileMode.Create))
    {
        await file.CopyToAsync(stream);
    }

    variante.ImageUrl = $"/images/variantes/{fileName}";
    await db.SaveChangesAsync();

    return Results.Ok(new { variante.Id, variante.ImageUrl });
})
.Accepts<IFormFile>("multipart/form-data")
.WithName("UploadVarianteImage") // <- Nom corrigé
.WithOpenApi();

// Map controllers - maintenant après var app = builder.Build()
app.MapControllers();

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}