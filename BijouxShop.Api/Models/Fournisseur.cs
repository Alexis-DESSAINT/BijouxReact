namespace BijouxShop.Api.Models;

public class Fournisseur
{
    public int Id { get; set; }
    public string Nom { get; set; } = null!;
    public string Contact { get; set; } = null!;
    public ICollection<LivraisonApprovisionnement> Approvisionnements { get; set; } = new List<LivraisonApprovisionnement>();
}