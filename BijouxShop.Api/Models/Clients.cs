namespace BijouxShop.Api.Models;

public class Client
{
    public int Id { get; set; }
    public string Email { get; set; } = null!;
    public string? Nom { get; set; }
    public string? Prenom { get; set; }
    public string Adresse { get; set; } = null!;
    public string Ville { get; set; } = null!;
    public string CodePostal { get; set; } = null!;
    public string? Telephone { get; set; }
    public ICollection<Commande> Commandes { get; set; } = new List<Commande>();
}