using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BijouxShop.Api.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Clients",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Prenom = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Adresse = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Ville = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CodePostal = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Telephone = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Clients", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Fournisseurs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Contact = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Fournisseurs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Gravures",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Texte = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Prix = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Gravures", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Articles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CategorieId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Articles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Articles_Categories_CategorieId",
                        column: x => x.CategorieId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Commandes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ClientId = table.Column<int>(type: "int", nullable: true),
                    DateCommande = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Total = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Statut = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Commandes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Commandes_Clients_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Clients",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Paniers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ClientId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Paniers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Paniers_Clients_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Clients",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "LivraisonApprovisionnements",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FournisseurId = table.Column<int>(type: "int", nullable: false),
                    DateLivraison = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LivraisonApprovisionnements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LivraisonApprovisionnements_Fournisseurs_FournisseurId",
                        column: x => x.FournisseurId,
                        principalTable: "Fournisseurs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Variantes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Prix = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Stock = table.Column<int>(type: "int", nullable: false),
                    ArticleId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Variantes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Variantes_Articles_ArticleId",
                        column: x => x.ArticleId,
                        principalTable: "Articles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Livraisons",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CommandeId = table.Column<int>(type: "int", nullable: false),
                    AdresseLivraison = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Statut = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateExpedition = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DateLivraison = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Livraisons", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Livraisons_Commandes_CommandeId",
                        column: x => x.CommandeId,
                        principalTable: "Commandes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Paiements",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CommandeId = table.Column<int>(type: "int", nullable: false),
                    StripePaymentId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DatePaiement = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Montant = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Statut = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Paiements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Paiements_Commandes_CommandeId",
                        column: x => x.CommandeId,
                        principalTable: "Commandes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ApprovisionnementItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    VarianteId = table.Column<int>(type: "int", nullable: false),
                    Quantite = table.Column<int>(type: "int", nullable: false),
                    LivraisonApprovisionnementId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApprovisionnementItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ApprovisionnementItems_LivraisonApprovisionnements_LivraisonApprovisionnementId",
                        column: x => x.LivraisonApprovisionnementId,
                        principalTable: "LivraisonApprovisionnements",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ApprovisionnementItems_Variantes_VarianteId",
                        column: x => x.VarianteId,
                        principalTable: "Variantes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CommandeItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    VarianteId = table.Column<int>(type: "int", nullable: false),
                    Quantite = table.Column<int>(type: "int", nullable: false),
                    GravureId = table.Column<int>(type: "int", nullable: true),
                    PrixUnitaire = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    CommandeId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CommandeItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CommandeItems_Commandes_CommandeId",
                        column: x => x.CommandeId,
                        principalTable: "Commandes",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_CommandeItems_Gravures_GravureId",
                        column: x => x.GravureId,
                        principalTable: "Gravures",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_CommandeItems_Variantes_VarianteId",
                        column: x => x.VarianteId,
                        principalTable: "Variantes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PanierItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    VarianteId = table.Column<int>(type: "int", nullable: false),
                    Quantite = table.Column<int>(type: "int", nullable: false),
                    GravureId = table.Column<int>(type: "int", nullable: true),
                    PanierId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PanierItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PanierItems_Gravures_GravureId",
                        column: x => x.GravureId,
                        principalTable: "Gravures",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PanierItems_Paniers_PanierId",
                        column: x => x.PanierId,
                        principalTable: "Paniers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PanierItems_Variantes_VarianteId",
                        column: x => x.VarianteId,
                        principalTable: "Variantes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ApprovisionnementItems_LivraisonApprovisionnementId",
                table: "ApprovisionnementItems",
                column: "LivraisonApprovisionnementId");

            migrationBuilder.CreateIndex(
                name: "IX_ApprovisionnementItems_VarianteId",
                table: "ApprovisionnementItems",
                column: "VarianteId");

            migrationBuilder.CreateIndex(
                name: "IX_Articles_CategorieId",
                table: "Articles",
                column: "CategorieId");

            migrationBuilder.CreateIndex(
                name: "IX_CommandeItems_CommandeId",
                table: "CommandeItems",
                column: "CommandeId");

            migrationBuilder.CreateIndex(
                name: "IX_CommandeItems_GravureId",
                table: "CommandeItems",
                column: "GravureId");

            migrationBuilder.CreateIndex(
                name: "IX_CommandeItems_VarianteId",
                table: "CommandeItems",
                column: "VarianteId");

            migrationBuilder.CreateIndex(
                name: "IX_Commandes_ClientId",
                table: "Commandes",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_LivraisonApprovisionnements_FournisseurId",
                table: "LivraisonApprovisionnements",
                column: "FournisseurId");

            migrationBuilder.CreateIndex(
                name: "IX_Livraisons_CommandeId",
                table: "Livraisons",
                column: "CommandeId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Paiements_CommandeId",
                table: "Paiements",
                column: "CommandeId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PanierItems_GravureId",
                table: "PanierItems",
                column: "GravureId");

            migrationBuilder.CreateIndex(
                name: "IX_PanierItems_PanierId",
                table: "PanierItems",
                column: "PanierId");

            migrationBuilder.CreateIndex(
                name: "IX_PanierItems_VarianteId",
                table: "PanierItems",
                column: "VarianteId");

            migrationBuilder.CreateIndex(
                name: "IX_Paniers_ClientId",
                table: "Paniers",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_Variantes_ArticleId",
                table: "Variantes",
                column: "ArticleId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ApprovisionnementItems");

            migrationBuilder.DropTable(
                name: "CommandeItems");

            migrationBuilder.DropTable(
                name: "Livraisons");

            migrationBuilder.DropTable(
                name: "Paiements");

            migrationBuilder.DropTable(
                name: "PanierItems");

            migrationBuilder.DropTable(
                name: "LivraisonApprovisionnements");

            migrationBuilder.DropTable(
                name: "Commandes");

            migrationBuilder.DropTable(
                name: "Gravures");

            migrationBuilder.DropTable(
                name: "Paniers");

            migrationBuilder.DropTable(
                name: "Variantes");

            migrationBuilder.DropTable(
                name: "Fournisseurs");

            migrationBuilder.DropTable(
                name: "Clients");

            migrationBuilder.DropTable(
                name: "Articles");

            migrationBuilder.DropTable(
                name: "Categories");
        }
    }
}
