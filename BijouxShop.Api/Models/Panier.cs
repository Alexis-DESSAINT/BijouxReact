namespace BijouxShop.Api.Models;

public class Panier
{
    public int Id { get; set; }
    public DateTime DateCreation { get; set; }
    public List<PanierItem> PanierItems { get; set; } = new List<PanierItem>();
}