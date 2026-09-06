using Npgsql;
using LibraryApi.Enums;
using System.Transactions;

public class PaymentRepository
{
  private readonly DatabaseHelper _databaseHelper;

  public PaymentRepository(DatabaseHelper databaseHelper)
  {
    _databaseHelper = databaseHelper;
  }

  public List<object> GetAllPayments()
  {
    using var connection = _databaseHelper.GetConnection();

    string sqlQuery = "select payment_id, payment_transaction_amount,payment_method,payment_status,payment_type,payment_reference_id,payment_notes from payments";

    using var command = new NpgsqlCommand(sqlQuery, connection);
    using var reader = command.ExecuteReader();

    List<object> paymentList = new List<object>();

    while (reader.Read())
    {
      paymentList.Add(new
      {
        Id = reader.GetGuid(0),
        TransactionAmount = reader.GetDecimal(1),
        PaymentMethod = reader.GetString(2),
        PaymentStatus = reader.GetString(3),
        PaymentType = reader.GetString(4),
        PaymentReferenceId = reader.GetString(5),
        PaymentNotes = reader.GetString(6),
      });

    }
    return paymentList;
  }

  public void AddPayment(PaymentDto newPayment)
  {
    using var connection = _databaseHelper.GetConnection();

    string sqlQuery = "insert into payments (payment_transaction_amount,payment_order_id,payment_user_id,payment_method,payment_status,payment_type,payment_reference_id,payment_notes) values(@transactionAmount, @orderId,@userId,@method,@status,@type,@referenceId,@notes);";

    using var command = new NpgsqlCommand(sqlQuery, connection);

    command.Parameters.AddWithValue("@transactionAmount", newPayment.payment_transaction_amount);
    command.Parameters.AddWithValue("@orderId", newPayment.payment_order_id);
    command.Parameters.AddWithValue("@userId", newPayment.payment_user_id);
    command.Parameters.AddWithValue("@method", newPayment.payment_method.ToString().ToLower());
    command.Parameters.AddWithValue("@status", newPayment.payment_status.ToString().ToLower());
    command.Parameters.AddWithValue("@type", newPayment.payment_type.ToString().ToLower());
    command.Parameters.AddWithValue("@referenceId", newPayment.payment_reference_id);
    command.Parameters.AddWithValue("@notes", newPayment.payment_notes);

    command.ExecuteNonQuery();
  }


  public void UpdatePayment(Guid id, PaymentDto updatedPayment)
  {
    using var connection = _databaseHelper.GetConnection();

    string sqlQuery = "update payments set payment_transaction_amount = @transactionAmount ,payment_order_id = @orderId ,payment_user_id = @userId, payment_method = @method, payment_status = @status, payment_type = @type, payment_reference_id = @referenceId, payment_notes = @notes where payment_id = @id";

    using var command = new NpgsqlCommand(sqlQuery, connection);

    command.Parameters.AddWithValue("@transactionAmount", updatedPayment.payment_transaction_amount);
    command.Parameters.AddWithValue("@orderId", updatedPayment.payment_order_id);
    command.Parameters.AddWithValue("@userId", updatedPayment.payment_user_id);
    command.Parameters.AddWithValue("@method", updatedPayment.payment_method.ToString().ToLower());
    command.Parameters.AddWithValue("@status", updatedPayment.payment_status.ToString().ToLower());
    command.Parameters.AddWithValue("@type", updatedPayment.payment_type.ToString().ToLower());
    command.Parameters.AddWithValue("@referenceId", updatedPayment.payment_reference_id);
    command.Parameters.AddWithValue("@notes", updatedPayment.payment_notes);
    command.Parameters.AddWithValue("@id", id);


    command.ExecuteNonQuery();
  }

  public void DeletePayment(Guid id)
  {
    using var connection = _databaseHelper.GetConnection();
    string sqlQuery = "delete from payments where payment_id = @id";
    using var command = new NpgsqlCommand(sqlQuery, connection);
    command.Parameters.AddWithValue("@id", id);

    command.ExecuteNonQuery();
  }
}