using BookClubApi.Data;
using BookClubApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace BookClubApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookController : Controller
    {
        private readonly BookClubDbContext bcDbContext;

        public BookController(BookClubDbContext bcDbContext)
        {
            this.bcDbContext = bcDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllBook()
        {
            var books = await bcDbContext.Books.ToListAsync();
            return Ok(books);
        }

        [HttpGet("GetAllBookRead")]
        public async Task<IActionResult> GetAllBookRead()
        {
            var books = await bcDbContext.BookReads.ToListAsync();
            return Ok(books);
        }

        [HttpGet]
        [Route("{id:guid}")]
        [ActionName("GetBook")]
        public async Task<IActionResult> GetBook([FromRoute] Guid id)
        {
            var book = await bcDbContext.Books.FirstOrDefaultAsync(x => x.Id == id);
            if (book != null)
            {
                return Ok(book);
            }

            return NotFound("Book not found");
        }

        [HttpGet]
        [Route("{userid:guid}/{bookid:guid}")]
        [ActionName("GetIsRead")]
        public async Task<IActionResult> GetIsRead([FromRoute] Guid userid,[FromRoute] Guid bookid)
        {
            var bookRead = await bcDbContext.BookReads.FirstOrDefaultAsync(x => x.UserId == userid && x.BookId == bookid);
            if (bookRead != null)
            {
                return Ok(bookRead);
            }

            return NotFound("BookRead not found");
        }

        [HttpPost]
        public async Task<IActionResult> AddBook([FromBody] Book book)
        {
            book.Id = Guid.NewGuid();
            await bcDbContext.Books.AddAsync(book);
            await bcDbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetBook), new { Id = book.Id }, book);
        }

        [HttpPost("addRead")]
        public async Task<IActionResult> AddBookRead([FromBody] BookRead bookRead)
        {
            bookRead.User = await bcDbContext.Users.FirstOrDefaultAsync(x => x.Id == bookRead.UserId);
            bookRead.Book = await bcDbContext.Books.FirstOrDefaultAsync(x => x.Id == bookRead.BookId);

            bool isExists = await bcDbContext.BookReads.AnyAsync(x => x.BookId == bookRead.BookId 
                && x.UserId == bookRead.UserId);
            if (isExists)
            {
                return BadRequest("A bookread is exists!");
            }

            if (bookRead.User != null
                && bookRead.Book != null) 
            {
                bookRead.Id = Guid.NewGuid();
                await bcDbContext.BookReads.AddAsync(bookRead);
                await bcDbContext.SaveChangesAsync();
                return CreatedAtAction(nameof(GetIsRead), new { userId = bookRead.UserId, bookId = bookRead.BookId }, bookRead);
            }

            return NotFound("Book or User not found!");
        }

        [HttpDelete]
        [Route("{userId:guid}/{bookId:guid}")]
        public async Task<IActionResult> DeleteBookRead([FromRoute] Guid userId, [FromRoute] Guid bookId)
        {
            var existingBookRead = await bcDbContext.BookReads.FirstOrDefaultAsync(x =>
            x.BookId == bookId && x.UserId == userId);

            if (existingBookRead != null)
            {
                bcDbContext.BookReads.Remove(existingBookRead);
                await bcDbContext.SaveChangesAsync();
                return Ok(existingBookRead);
            }

            return NotFound("Book not found");
        }
    }
}
