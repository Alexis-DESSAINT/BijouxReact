namespace BijouxShop.Api.Models;

public class Panier
{
    public int Id { get; set; }
    public int? ClientId { get; set; }
    public Client? Client { get; set; }
    public ICollection<PanierItem> Items { get; set; } = new List<PanierItem>();
}