using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BijouxShop.Api.Data;
using BijouxShop.Api.Models;

[ApiController]
[Route("api/[controller]")]
public class CartController : ControllerBase
{
    private readonly BijouxShopContext _db;

    public CartController(BijouxShopContext db)
    {
        _db = db;
    }

    // POST /api/cart/add
    [HttpPost("add")]
    public async Task<IActionResult> AddToCart([FromBody] AddToCartDto dto)
    {
        // Pour simplifier, on suppose un panier unique (id=1)
        var panier = await _db.Paniers.Include(p => p.PanierItems).FirstOrDefaultAsync(p => p.Id == 1);
        if (panier == null)
        {
            panier = new Panier { Id = 1, DateCreation = DateTime.Now };
            _db.Paniers.Add(panier);
            await _db.SaveChangesAsync();
        }

        var existingItem = panier.PanierItems.FirstOrDefault(i => i.VarianteId == dto.VarianteId);
        if (existingItem != null)
        {
            existingItem.Quantite += dto.Quantite;
        }
        else
        {
            panier.PanierItems.Add(new PanierItem
            {
                VarianteId = dto.VarianteId,
                Quantite = dto.Quantite
            });
        }

        await _db.SaveChangesAsync();
        return Ok();
    }

    // GET /api/cart
    [HttpGet]
    public async Task<IActionResult> GetCart()
    {
        var panier = await _db.Paniers
            .Include(p => p.PanierItems)
                .ThenInclude(i => i.Variante!)
                    .ThenInclude(v => v.Article)
            .FirstOrDefaultAsync(p => p.Id == 1);

        if (panier == null)
            return Ok(new { items = new List<object>() }); // <-- toujours retourner un objet

        var items = panier.PanierItems
            .Where(i => i.Variante != null && i.Variante.Article != null)
            .Select(i => new
            {
                i.Id,
                i.Quantite,
                Variante = new
                {
                    Id = i.Variante!.Id,
                    Nom = i.Variante.Nom,
                    Prix = i.Variante.Prix,
                    ImageUrl = i.Variante.ImageUrl,
                    ArticleNom = i.Variante.Article!.Nom
                }
            });

        return Ok(new { items }); // <-- toujours retourner un objet JSON
    }
    [HttpDelete("remove/{itemId}")]
    public async Task<IActionResult> RemoveFromCart(int itemId)
    {
        var item = await _db.PanierItems.FindAsync(itemId);
        if (item == null)
            return NotFound();

        _db.PanierItems.Remove(item);
        await _db.SaveChangesAsync();
        return Ok();
    }
}

public class AddToCartDto
{
    public int VarianteId { get; set; }
    public int Quantite { get; set; }
}