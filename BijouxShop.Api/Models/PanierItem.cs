namespace BijouxShop.Api.Models;

public class PanierItem
{
    public int Id { get; set; }
    public int PanierId { get; set; }
    public Panier? Panier { get; set; }
    public int VarianteId { get; set; }
    public Variante? Variante { get; set; }
    public int Quantite { get; set; }
    
}