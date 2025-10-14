using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BijouxShop.Api.Data;
using BijouxShop.Api.Models;
using System.Linq;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly BijouxShopContext _db;

    public ProductsController(BijouxShopContext db)
    {
        _db = db;
    }

    // GET /api/products?categoryId=1
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] int? categoryId)
    {
        var query = _db.Articles
            .Include(a => a.Categorie)
            .Include(a => a.Variantes)
            .AsQueryable();

        if (categoryId.HasValue)
            query = query.Where(a => a.CategorieId == categoryId.Value);

        var products = await query
            .Select(a => new
            {
                a.Id,
                a.Nom,
                a.Description,
                Categorie = a.Categorie != null ? a.Categorie.Nom : null,
                Prix = a.Variantes.OrderBy(v => v.Id).Select(v => v.Prix).FirstOrDefault(),
                PremiereVariante = a.Variantes
                    .OrderBy(v => v.Id)
                    .Select(v => new
                    {
                        v.Id,
                        v.Prix,
                        v.ImageUrl,
                        v.Stock
                    })
                    .FirstOrDefault()
            })
            .ToListAsync();

        return Ok(products);
    }

    // GET /api/products/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var article = await _db.Articles
            .Include(a => a.Categorie)
            .Include(a => a.Variantes)
            .FirstOrDefaultAsync(a => a.Id == id);

        if (article == null)
            return NotFound();

        var variantesProjetees = article.Variantes
            .OrderBy(v => v.Id)
            .Select(v => new
            {
                v.Id,
                v.Nom,
                v.Prix,
                v.ImageUrl,
                v.Stock
            })
            .ToList();

        var result = new
        {
            article.Id,
            article.Nom,
            article.Description,
            Categorie = article.Categorie?.Nom,
            Prix = variantesProjetees.FirstOrDefault()?.Prix,
            PremiereVariante = variantesProjetees.FirstOrDefault(),
            Variantes = variantesProjetees
        };

        return Ok(result);
    }
}