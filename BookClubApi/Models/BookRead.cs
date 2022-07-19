using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookClubApi.Models
{
    [Table("BookReads")]
    [Comment("Talbe of bookread")]
    public class BookRead
    {
        [Key]
        public Guid Id { get; set; }

        #region References
        public Guid UserId { get; set; }
        public User User { get; set; }

        public Guid BookId { get; set; }
        public Book Book { get; set; }
        #endregion
    }
}
