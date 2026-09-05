using Npgsql;

public class DatabaseHelper
{
  private readonly IConfiguration _config;
  public DatabaseHelper(IConfiguration config)
  {
    _config = config;
  }

  public NpgsqlConnection GetConnection()
  {
    string connectionString = _config.GetConnectionString("DefaultConnection")!;
    var connection = new NpgsqlConnection(connectionString);
    connection.Open();
    return connection;
  }
}