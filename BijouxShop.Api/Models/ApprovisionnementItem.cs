namespace BijouxShop.Api.Models;

public class ApprovisionnementItem
{
    public int Id { get; set; }
    public int VarianteId { get; set; }
    public Variante Variante { get; set; } = null!;
    public int Quantite { get; set; }
}