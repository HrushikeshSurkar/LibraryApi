using Npgsql;

public class BookRepository
{
  private readonly DatabaseHelper _databaseHelper;

  public BookRepository(DatabaseHelper databaseHelper)
  {
    _databaseHelper = databaseHelper;
  }

  public PaginatedBookResponseDto GetAllBooks(int pageNumber, int pageSize)
  {
    using var connection = _databaseHelper.GetConnection();

    int offset = (pageNumber - 1) * pageSize;

    string sqlQuery = "select book_id, book_title, book_author, book_description, book_shelf, book_total_copies from books where book_is_deleted = false limit @limit offset @offset;";
    using var command = new NpgsqlCommand(sqlQuery, connection);
    command.Parameters.AddWithValue("@limit", pageSize);
    command.Parameters.AddWithValue("@offset", offset);

    using var reader = command.ExecuteReader();


    List<BookDto> booksList = new List<BookDto>();

    while (reader.Read())
    {
      booksList.Add(new BookDto
      {
        book_id = reader.GetGuid(0),
        book_title = reader.GetString(1),
        book_author = reader.GetString(2),
        book_description = reader.GetString(3),
        book_shelf = reader.GetString(4),
        book_total_copies = reader.GetInt16(5)
      });
    }
    reader.Close();

    string getBooksCount = "select count(*) from books where book_is_deleted = false;";

    using var command2 = new NpgsqlCommand(getBooksCount, connection);
    int totalCount = Convert.ToInt32(command2.ExecuteScalar());

    return new PaginatedBookResponseDto
    {
      pageNumber = pageNumber,
      pageSize = pageSize,
      pageTotal = totalCount,
      booksArray = booksList
    };
  }


  public object AddBook(BookDto newBook)
  {
    using var connection = _databaseHelper.GetConnection();

    string sqlQueryAdd = "insert into books(book_title,book_description,book_author,book_shelf,book_total_copies) values(@title, @description, @author, @shelf, @copies) returning *";
    using var command = new NpgsqlCommand(sqlQueryAdd, connection);
    command.Parameters.AddWithValue("@title", newBook.book_title);
    command.Parameters.AddWithValue("@description", newBook.book_description);
    command.Parameters.AddWithValue("@author", newBook.book_author);
    command.Parameters.AddWithValue("@shelf", newBook.book_shelf);
    command.Parameters.AddWithValue("@copies", newBook.book_total_copies);

    using var reader = command.ExecuteReader();

    if (reader.Read())
    {
      return new
      {
        book_id = reader.GetGuid(0),
        book_title = reader.GetString(1),
        book_author = reader.GetString(2),
        book_description = reader.GetString(3),
        book_shelf = reader.GetString(4),
        book_total_copies = reader.GetInt16(5)
      };
    }
    return new { };

  }

  public object UpdateBook(Guid id, BookDto updatedBook)
  {
    using var connection = _databaseHelper.GetConnection();

    string sqlQuery = "update books set book_title = @title, book_description = @description, book_author = @author, book_shelf = @shelf, book_total_copies = @copies where book_id = @id returning *";

    using var command = new NpgsqlCommand(sqlQuery, connection);

    command.Parameters.AddWithValue("@title", updatedBook.book_title);
    command.Parameters.AddWithValue("@description", updatedBook.book_description);
    command.Parameters.AddWithValue("@author", updatedBook.book_author);
    command.Parameters.AddWithValue("@shelf", updatedBook.book_shelf);
    command.Parameters.AddWithValue("@copies", updatedBook.book_total_copies);
    command.Parameters.AddWithValue("@id", id);

    using var reader = command.ExecuteReader();

    if (reader.Read())
    {
      return new
      {
        book_id = reader.GetGuid(0),
        book_title = reader.GetString(1),
        book_author = reader.GetString(2),
        book_description = reader.GetString(3),
        book_shelf = reader.GetString(4),
        book_total_copies = reader.GetInt16(5)
      };
    }
    return new { };
  }

  public void DeleteBook(Guid id)
  {
    using var connection = _databaseHelper.GetConnection();
    string sqlQuery = "update books set book_is_deleted = true where book_id = @id";
    using var command = new NpgsqlCommand(sqlQuery, connection);
    command.Parameters.AddWithValue("@id", id);

    command.ExecuteNonQuery();
  }
}