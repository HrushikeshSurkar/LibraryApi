using Npgsql;
using LibraryApi.Enums;
using System.Transactions;

public class OrderRepository
{
  private readonly DatabaseHelper _databaseHelper;

  public OrderRepository(DatabaseHelper databaseHelper)
  {
    _databaseHelper = databaseHelper;
  }

  public List<object> GetAllOrders()
  {
    using var connection = _databaseHelper.GetConnection();

    string sqlQuery = "select order_id, order_user_id, order_book_id, order_due_at,order_fine_amount,order_has_fine,order_is_damaged from orders";

    using var command = new NpgsqlCommand(sqlQuery, connection);
    using var reader = command.ExecuteReader();

    List<object> paymentList = new List<object>();

    while (reader.Read())
    {
      paymentList.Add(new
      {
        Id = reader.GetGuid(0),
        UserId = reader.GetGuid(1),
        BookId = reader.GetGuid(2),
        DueAt = reader.GetDateTime(3),
        FineAmount = reader.GetDecimal(4),
        HasFineAmount = reader.GetBoolean(5),
        IsDamaged = reader.GetBoolean(6)
      });

    }
    return paymentList;
  }

  public void AddOrder(OrderDto newOrder)
  {
    using var connection = _databaseHelper.GetConnection();

    string sqlQuery = "insert into orders (order_user_id,order_book_id,order_due_at,order_fine_amount,order_has_fine,order_is_damaged) values(@UserId,@BookId,@DueAt,@FineAmount,@HasFineAmount,@IsDamaged);";

    using var command = new NpgsqlCommand(sqlQuery, connection);

    command.Parameters.AddWithValue("@UserId", newOrder.order_user_id);
    command.Parameters.AddWithValue("@BookId", newOrder.order_book_id);
    command.Parameters.AddWithValue("@DueAt", newOrder.order_due_at);
    command.Parameters.AddWithValue("@FineAmount", newOrder.order_fine_amount);
    command.Parameters.AddWithValue("@HasFineAmount", newOrder.order_has_fine);
    command.Parameters.AddWithValue("@IsDamaged", newOrder.order_is_damaged);

    command.ExecuteNonQuery();
  }

  public void UpdateOrders(Guid id, OrderDto updatedOrder)
  {
    using var connection = _databaseHelper.GetConnection();

    string sqlQuery = "update orders set order_user_id = @UserId,order_book_id = @BookId,order_due_at = @DueAt, order_fine_amount = @FineAmount, order_has_fine = @HasFineAmount, order_is_damaged = @IsDamaged where order_id = @id";

    using var command = new NpgsqlCommand(sqlQuery, connection);

    command.Parameters.AddWithValue("@UserId", updatedOrder.order_user_id);
    command.Parameters.AddWithValue("@BookId", updatedOrder.order_book_id);
    command.Parameters.AddWithValue("@DueAt", updatedOrder.order_due_at);
    command.Parameters.AddWithValue("@FineAmount", updatedOrder.order_fine_amount);
    command.Parameters.AddWithValue("@HasFineAmount", updatedOrder.order_has_fine);
    command.Parameters.AddWithValue("@IsDamaged", updatedOrder.order_is_damaged);
    command.Parameters.AddWithValue("@id", id);


    command.ExecuteNonQuery();
  }

  public void DeleteOrders(Guid id)
  {
    using var connection = _databaseHelper.GetConnection();
    string sqlQuery = "delete from orders where order_id = @id";
    using var command = new NpgsqlCommand(sqlQuery, connection);
    command.Parameters.AddWithValue("@id", id);

    command.ExecuteNonQuery();
  }
}