using Npgsql;

public class UserRepository
{
  private readonly DatabaseHelper _databaseHelper;

  public UserRepository(DatabaseHelper databaseHelper)
  {
    _databaseHelper = databaseHelper;
  }

  public List<object> GetAllUsers()
  {
    using var connection = _databaseHelper.GetConnection();

    string sqlQuery = "select user_id, user_name, user_email, user_contact, user_address, user_role from users where user_is_deleted = false;";
    using var command = new NpgsqlCommand(sqlQuery, connection);
    using var reader = command.ExecuteReader();

    List<object> userList = new List<object>();

    while (reader.Read())
    {
      userList.Add(new
      {
        Id = reader.GetGuid(0),
        Name = reader.IsDBNull(1) ? "" : reader.GetString(1),
        Email = reader.IsDBNull(2) ? "" : reader.GetString(2),
        Contact = reader.IsDBNull(3) ? "" : reader.GetString(3),
        Address = reader.IsDBNull(4) ? "" : reader.GetString(4),
        Role = reader.IsDBNull(5) ? "Reader" : reader.GetString(5)
      });
    }
    return userList;
  }

  public void AddUser(UserDto newUser)
  {
    using var connection = _databaseHelper.GetConnection();

    string sqlQuery = "insert into users (user_name,user_email,user_contact,user_address,user_role) values(@name,@email,@contact,@address,@role);";

    using var command = new NpgsqlCommand(sqlQuery, connection);

    command.Parameters.AddWithValue("@name", newUser.user_name);
    command.Parameters.AddWithValue("@email", newUser.user_email);
    command.Parameters.AddWithValue("@contact", newUser.user_contact);
    command.Parameters.AddWithValue("@address", newUser.user_address);
    command.Parameters.AddWithValue("@role", newUser.user_role.ToString().ToLower());

    command.ExecuteNonQuery();
  }

  public void UpdateUser(Guid id, UserDto updatedUser)
  {
    using var connection = _databaseHelper.GetConnection();

    string sqlQuery = "update users set user_name = @name, user_email = @email, user_contact = @contact, user_address = @address, user_role = @role where user_id = @id;";

    using var command = new NpgsqlCommand(sqlQuery, connection);

    command.Parameters.AddWithValue("@name", updatedUser.user_name);
    command.Parameters.AddWithValue("@email", updatedUser.user_email);
    command.Parameters.AddWithValue("@contact", updatedUser.user_contact);
    command.Parameters.AddWithValue("@address", updatedUser.user_address);
    command.Parameters.AddWithValue("@role", updatedUser.user_role.ToString().ToLower());
    command.Parameters.AddWithValue("@id", id);

    command.ExecuteNonQuery();
  }

  public void DeleteUser(Guid id)
  {
    using var connection = _databaseHelper.GetConnection();

    string sqlQuery = "update users set user_is_deleted = true where user_id = @id;";

    using var command = new NpgsqlCommand(sqlQuery, connection);
    command.Parameters.AddWithValue("@id", id);

    command.ExecuteNonQuery();
  }
}