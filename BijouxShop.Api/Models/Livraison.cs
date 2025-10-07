namespace BijouxShop.Api.Models;

public class Livraison
{
    public int Id { get; set; }
    public int CommandeId { get; set; }
    public Commande Commande { get; set; } = null!;
    public string AdresseLivraison { get; set; } = null!;
    public string Statut { get; set; } = null!; // En cours, Livrée, etc.
    public DateTime? DateExpedition { get; set; }
    public DateTime? DateLivraison { get; set; }
}