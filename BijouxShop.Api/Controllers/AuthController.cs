using Microsoft.AspNetCore.Mvc;
using BijouxShop.Api.Models;
using BijouxShop.Api.Data;
using BCrypt.Net;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace BijouxShop.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly BijouxShopContext _db;

        public AuthController(BijouxShopContext db)
        {
            _db = db;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            // Vérifie si l'email existe déjà
            if (await _db.Clients.AnyAsync(c => c.Email == dto.Email))
                return BadRequest("Cet email est déjà utilisé.");

            // Vérifie que le code postal ne contient que des chiffres
            if (!Regex.IsMatch(dto.CodePostal, @"^\d+$"))
                return BadRequest("Le code postal doit contenir uniquement des chiffres.");

            var client = new Client
            {
                Email = dto.Email,
                Nom = dto.Nom.ToUpperInvariant(), // Nom en majuscules
                Prenom = dto.Prenom,
                Adresse = dto.Adresse,
                Ville = dto.Ville,
                CodePostal = dto.CodePostal,
                Telephone = dto.Telephone,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password)
            };

            _db.Clients.Add(client);
            await _db.SaveChangesAsync();

            return Ok("Compte créé !");
        }
    }

    // DTO pour l'inscription
    public class RegisterDto
    {
        public string Email { get; set; } = string.Empty;
        public string Nom { get; set; } = string.Empty;
        public string Prenom { get; set; } = string.Empty;
        public string Adresse { get; set; } = string.Empty;
        public string Ville { get; set; } = string.Empty;
        public string CodePostal { get; set; } = string.Empty;
        public string Telephone { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}