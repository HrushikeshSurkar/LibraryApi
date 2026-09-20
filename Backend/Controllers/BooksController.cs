using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class BooksController : ControllerBase
{
  private readonly BookRepository _bookRepository;

  public BooksController(BookRepository bookRepository)
  {
    _bookRepository = bookRepository;
  }

  [HttpGet]
  public IActionResult GetAllBooks(int pageNumber = 1, int pageSize = 5)
  {
    var bookList = _bookRepository.GetAllBooks(pageNumber, pageSize);
    return Ok(new { Data = bookList, Message = "Books Fetched Successfully", Success = true });
  }

  [HttpPost]
  public IActionResult PostBooks([FromBody] BookDto newBook)
  {
    var bookList = _bookRepository.AddBook(newBook);
    return Ok(new { Data = bookList, Message = "Book Added Successfully", Success = true });
  }

  [HttpPut("{id}")]
  public IActionResult PutBooks(Guid id, [FromBody] BookDto updatedBook)
  {
    var bookList = _bookRepository.UpdateBook(id, updatedBook);
    return Ok(new { Data = bookList, Message = "Book Updated Successfully", Success = true });
  }

  [HttpDelete("{id}")]
  public IActionResult DeleteBooks(Guid id)
  {
    _bookRepository.DeleteBook(id);
    return Ok(new { Message = "Book Deleted Successfully", Success = true });
  }
}