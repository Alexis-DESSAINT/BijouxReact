namespace BijouxShop.Api.Models;

public class CommandeItem
{
    public int Id { get; set; }
    public int VarianteId { get; set; }
    public Variante Variante { get; set; } = null!;
    public int Quantite { get; set; }
    public int? GravureId { get; set; }
    public Gravure? Gravure { get; set; }
    public decimal PrixUnitaire { get; set; }
}