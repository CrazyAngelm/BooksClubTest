using System.ComponentModel.DataAnnotations;

namespace BookClubApi.Models
{
    public class AuthenticateModel
    {
        [Required]
        public string Login { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
