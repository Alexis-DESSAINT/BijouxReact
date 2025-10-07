namespace BijouxShop.Api.Models;

public class Variante
{
    public int Id { get; set; }
    public string Nom { get; set; } = null!;
    public decimal Prix { get; set; }
    public int Stock { get; set; }
    public int ArticleId { get; set; }
    public Article Article { get; set; } = null!;
}