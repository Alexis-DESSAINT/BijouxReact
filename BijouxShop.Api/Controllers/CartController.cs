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
        var variante = await _db.Variantes.FindAsync(dto.VarianteId);
        if (variante == null)
            return NotFound();

        var panier = await _db.Paniers
            .Include(p => p.PanierItems)
            .FirstOrDefaultAsync(p => p.Id == 1);

        if (panier == null)
        {
            panier = new Panier { Id = 1, DateCreation = DateTime.Now, PanierItems = new List<PanierItem>() };
            _db.Paniers.Add(panier);
            await _db.SaveChangesAsync();
        }

        var existingItem = panier.PanierItems.FirstOrDefault(i => i.VarianteId == dto.VarianteId);
        int totalRequested = dto.Quantite + (existingItem?.Quantite ?? 0);

        if (totalRequested > variante.Stock)
            return BadRequest(new { message = $"Stock insuffisant : il reste {variante.Stock - (existingItem?.Quantite ?? 0)} exemplaire(s) disponible(s)." });

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

    [HttpPatch("update/{itemId}")]
    public async Task<IActionResult> UpdateQuantity(int itemId, [FromBody] UpdateQuantityDto dto)
    {
        var item = await _db.PanierItems
            .Include(i => i.Variante)
            .FirstOrDefaultAsync(i => i.Id == itemId);

        if (item == null)
            return NotFound();

        if (item.Variante == null)
            return BadRequest(new { message = "Variante introuvable." });

        int newQuantity = item.Quantite + dto.Delta;

        // Calcul du stock restant (stock total - quantité déjà dans le panier pour cet item)
        int stockRestant = item.Variante.Stock - item.Quantite;

        if (newQuantity > item.Variante.Stock)
            return BadRequest(new { message = $"Stock insuffisant : il reste {stockRestant} exemplaire(s) disponible(s) pour cette variante dans votre panier." });

        if (newQuantity < 1)
            newQuantity = 1;

        item.Quantite = newQuantity;
        await _db.SaveChangesAsync();
        return Ok();
    }
}

public class AddToCartDto
{
    public int VarianteId { get; set; }
    public int Quantite { get; set; }
}

public class UpdateQuantityDto
{
    public int Delta { get; set; }
}