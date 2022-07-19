using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookClubApi.Models
{
    [Table("Users")]
    [Comment("Talbe of users")]
    public class User
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string Login { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
