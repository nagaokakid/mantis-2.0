using Microsoft.AspNetCore.Mvc;
using Backend.Data;
using Backend.Data.Model;
using Backend.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class CommentController : ControllerBase
    {
        private readonly CommentService _commentService;

        public CommentController(AppDbContext context)
        {
            _commentService = new CommentService(context);
        }

        // GET: api/comment
        [HttpGet]
        public ActionResult<IQueryable<Comment>> Get()
        {
            try
            {
                var comments = _commentService.GetAllComments();
                return Ok(comments);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // GET api/comment/GUID
        [HttpGet("{id}")]
        public async Task<ActionResult<Comment>> Get(string id)
        {
            try
            {
                var comment = await _commentService.GetComment(id);
                if (comment == null)
                {
                    return NotFound();
                }
                return Ok(comment);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }

        // POST api/comment
        [HttpPost]
        public async Task<ActionResult<Comment>> Post([FromBody] Comment newComment)
        {
            try
            {
                newComment.Id = Guid.NewGuid().ToString();
                newComment.Date = newComment.Date.ToUniversalTime();
                var comment = await _commentService.CreateComment(newComment);
                return CreatedAtAction(nameof(Post), comment);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // PUT api/comment/GUID
        [HttpPut("{id}")]
        public async Task<ActionResult<Comment>> Put(string id, [FromBody] Comment updatedComment)
        {
            try
            {
                if (id != updatedComment.Id)
                {
                    return BadRequest("ID provided in URL doesn't match the ID in the request body.");
                }
                var result = await _commentService.UpdateComment(updatedComment);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // DELETE api/comment/GUID
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> Delete(string id)
        {
            try
            {
                bool result = await _commentService.DeleteComment(id);
                if (!result)
                {
                    return NotFound("Resource with given ID could not be found.");
                }
                return result;
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
