using Microsoft.EntityFrameworkCore;
using BijouxShop.Api.Models;

namespace BijouxShop.Api.Data;

public class BijouxShopContext : DbContext
{
    public BijouxShopContext() { }
    public BijouxShopContext(DbContextOptions<BijouxShopContext> options) : base(options) { }

    public DbSet<Client> Clients => Set<Client>();
    public DbSet<Categorie> Categories => Set<Categorie>();
    public DbSet<Article> Articles => Set<Article>();
    public DbSet<Variante> Variantes => Set<Variante>();
    public DbSet<Gravure> Gravures => Set<Gravure>();
    public DbSet<Panier> Paniers => Set<Panier>();
    public DbSet<PanierItem> PanierItems => Set<PanierItem>();
    public DbSet<Commande> Commandes => Set<Commande>();
    public DbSet<CommandeItem> CommandeItems => Set<CommandeItem>();
    public DbSet<Paiement> Paiements => Set<Paiement>();
    public DbSet<Livraison> Livraisons => Set<Livraison>();
    public DbSet<Fournisseur> Fournisseurs => Set<Fournisseur>();
    public DbSet<LivraisonApprovisionnement> LivraisonApprovisionnements => Set<LivraisonApprovisionnement>();
    public DbSet<ApprovisionnementItem> ApprovisionnementItems => Set<ApprovisionnementItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Ajoute ici les configurations personnalisées si besoin
        base.OnModelCreating(modelBuilder);
    }
}