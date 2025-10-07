namespace BijouxShop.Api.Models;

public class Article
{
    public int Id { get; set; }
    public string Nom { get; set; } = null!;
    public string Description { get; set; } = null!;
    public int CategorieId { get; set; }
    public Categorie Categorie { get; set; } = null!;
    public ICollection<Variante> Variantes { get; set; } = new List<Variante>();
}