namespace BijouxShop.Api.Models;

public class LivraisonApprovisionnement
{
    public int Id { get; set; }
    public int FournisseurId { get; set; }
    public Fournisseur Fournisseur { get; set; } = null!;
    public DateTime DateLivraison { get; set; }
    public ICollection<ApprovisionnementItem> Items { get; set; } = new List<ApprovisionnementItem>();
}