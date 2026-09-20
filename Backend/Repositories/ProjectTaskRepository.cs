using Npgsql;

public class ProjectTaskRepository
{
  private readonly DatabaseHelper _databaseHelper;

  public ProjectTaskRepository(DatabaseHelper databaseHelper)
  {
    _databaseHelper = databaseHelper;
  }

  public List<ProjectTaskDto> GetAllTasks()
  {
    using var connection = _databaseHelper.GetConnection();

    string sqlQuery = """
      select task_id, task_title, task_completed
      from project_tasks
      order by task_created_at;
      """;

    using var command = new NpgsqlCommand(sqlQuery, connection);
    using var reader = command.ExecuteReader();

    List<ProjectTaskDto> tasks = new();

    while (reader.Read())
    {
      tasks.Add(new ProjectTaskDto
      {
        task_id = reader.GetGuid(0),
        task_title = reader.GetString(1),
        task_completed = reader.GetBoolean(2)
      });
    }

    return tasks;
  }

  public ProjectTaskDto AddTask(ProjectTaskDto newTask)
  {
    using var connection = _databaseHelper.GetConnection();

    string sqlQuery = """
      insert into project_tasks (task_title, task_completed)
      values (@title, @completed)
      returning task_id, task_title, task_completed;
      """;

    using var command = new NpgsqlCommand(sqlQuery, connection);

    command.Parameters.AddWithValue("@title", newTask.task_title);
    command.Parameters.AddWithValue("@completed", newTask.task_completed);

    using var reader = command.ExecuteReader();

    if (reader.Read())
    {
      return new ProjectTaskDto
      {
        task_id = reader.GetGuid(0),
        task_title = reader.GetString(1),
        task_completed = reader.GetBoolean(2)
      };
    }

    throw new Exception("Task could not be created.");
  }

  public ProjectTaskDto UpdateTask(Guid id, ProjectTaskDto updatedTask)
  {
    using var connection = _databaseHelper.GetConnection();

    string sqlQuery = """
      update project_tasks
      set task_title = @title,
          task_completed = @completed
      where task_id = @id
      returning task_id, task_title, task_completed;
      """;

    using var command = new NpgsqlCommand(sqlQuery, connection);

    command.Parameters.AddWithValue("@id", id);
    command.Parameters.AddWithValue("@title", updatedTask.task_title);
    command.Parameters.AddWithValue("@completed", updatedTask.task_completed);

    using var reader = command.ExecuteReader();

    if (reader.Read())
    {
      return new ProjectTaskDto
      {
        task_id = reader.GetGuid(0),
        task_title = reader.GetString(1),
        task_completed = reader.GetBoolean(2)
      };
    }

    throw new Exception("Task not found.");
  }

  public void DeleteTask(Guid id)
  {
    using var connection = _databaseHelper.GetConnection();

    string sqlQuery = """
      delete from project_tasks
      where task_id = @id;
      """;

    using var command = new NpgsqlCommand(sqlQuery, connection);

    command.Parameters.AddWithValue("@id", id);

    command.ExecuteNonQuery();
  }

}