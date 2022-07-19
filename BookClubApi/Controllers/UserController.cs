using BookClubApi.Data;
using BookClubApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookClubApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly BookClubDbContext bcDbContext;

        public UserController(BookClubDbContext bcDbContext)
        {
            this.bcDbContext = bcDbContext;
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] AuthenticateModel model) 
        {
            var user = await bcDbContext.Users.FirstOrDefaultAsync(x =>
            x.Login == model.Login && x.Password == model.Password);

            if (user == null)
                return BadRequest(new { message = "Login or password is incorrect" });

            return Ok(user);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUser() 
        {
            var users = await bcDbContext.Users.ToListAsync();
            return Ok(users);
        }

        [HttpGet]
        [Route("{id:guid}")]
        [ActionName("GetUser")]
        public async Task<IActionResult> GetUser([FromRoute] Guid id)
        {
            var user = await bcDbContext.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (user != null) 
            {
                return Ok(user);
            }

            return NotFound("User not found");
        }

        [HttpPost]
        public async Task<IActionResult> AddUser([FromBody] User user)
        {
            user.Id = Guid.NewGuid();
            bool isExists = await bcDbContext.Users.AnyAsync(x => x.Login == user.Login);
            if (isExists) 
            {
                return BadRequest("A user with this login exists!");
            }

            await bcDbContext.Users.AddAsync(user);
            await bcDbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetUser), new { Id = user.Id}, user);
        }

        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> GetUser([FromRoute] Guid id, [FromBody] User user)
        {
            var existingUser = await bcDbContext.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (existingUser != null)
            {
                existingUser.Id = user.Id;
                existingUser.Login = user.Login;
                existingUser.Password = user.Password;
                await bcDbContext.SaveChangesAsync();
                return Ok(existingUser);
            }

            return NotFound("User not found");
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteUser([FromRoute] Guid id)
        {
            var existingUser = await bcDbContext.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (existingUser != null)
            {
                bcDbContext.Users.Remove(existingUser);
                await bcDbContext.SaveChangesAsync();
                return Ok(existingUser);
            }

            return NotFound("User not found");
        }
    }
}
