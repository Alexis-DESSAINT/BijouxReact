namespace BijouxShop.Api.Models;

public class Paiement
{
    public int Id { get; set; }
    public int CommandeId { get; set; }
    public Commande Commande { get; set; } = null!;
    public string StripePaymentId { get; set; } = null!;
    public DateTime DatePaiement { get; set; }
    public decimal Montant { get; set; }
    public string Statut { get; set; } = null!; // Payé, En attente, etc.
}