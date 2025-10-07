namespace BijouxShop.Api.Models;

public class Commande
{
    public int Id { get; set; }
    public int? ClientId { get; set; }
    public Client? Client { get; set; }
    public DateTime DateCommande { get; set; }
    public decimal Total { get; set; }
    public string Statut { get; set; } = null!; // En cours, Livrée, etc.
    public ICollection<CommandeItem> Items { get; set; } = new List<CommandeItem>();
    public Paiement? Paiement { get; set; }
    public Livraison? Livraison { get; set; }
} 