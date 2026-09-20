public class PaginatedBookResponseDto
{
  public required int pageNumber { get; set; }
  public required int pageSize { get; set; }
  public required int pageTotal { get; set; }
  public required List<BookDto> booksArray { get; set; }
}