namespace BijouxShop.Api.Models;

public class Categorie
{
    public int Id { get; set; }
    public string Nom { get; set; } = null!;
    public ICollection<Article> Articles { get; set; } = new List<Article>();
}