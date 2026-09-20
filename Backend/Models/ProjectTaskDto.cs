public class ProjectTaskDto
{
  public Guid task_id { get; set; }
  public required string task_title { get; set; }
  public bool task_completed { get; set; }
}