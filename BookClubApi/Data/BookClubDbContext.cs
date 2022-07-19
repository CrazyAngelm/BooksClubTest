using BookClubApi.Models;
using Microsoft.EntityFrameworkCore;

namespace BookClubApi.Data
{
    public class BookClubDbContext : DbContext
    {
        public BookClubDbContext(DbContextOptions options) : base(options)
        {
        }

        #region DbSet

        public DbSet<User> Users { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<BookRead> BookReads { get; set; }

        #endregion

        protected override void OnModelCreating(ModelBuilder modelBuilder) 
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<BookRead>(model => 
            {
                model.HasOne(a => a.User)
                .WithMany()
                .HasForeignKey(a => a.UserId);

                model.HasOne(a => a.Book)
                .WithMany()
                .HasForeignKey(a => a.BookId);
            });
        }
    }
}
