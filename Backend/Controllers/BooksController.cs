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
  public IActionResult GetBooks()
  {
    var bookList = _bookRepository.GetAllBooks();
    return Ok(new { Data = bookList, Message = "Books Fetched Successfully" });
  }

  [HttpPost]
  public IActionResult PostBooks([FromBody] BookDto newBook)
  {
    _bookRepository.AddBook(newBook);
    return Ok(new { Message = "Book Added Successfully" });
  }

  [HttpPut("{id}")]
  public IActionResult PutBooks(Guid id, [FromBody] BookDto updatedBook)
  {
    _bookRepository.UpdateBook(id, updatedBook);
    return Ok(new { Message = "Book Updated Successfully" });
  }

  [HttpDelete("{id}")]
  public IActionResult DeleteBooks(Guid id)
  {
    _bookRepository.DeleteBook(id);
    return Ok(new { Message = "Book Deleted Successfully" });
  }
}