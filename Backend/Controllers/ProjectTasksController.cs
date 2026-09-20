using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class ProjectTasksController : ControllerBase
{
  private readonly ProjectTaskRepository _projectTaskRepository;

  public ProjectTasksController(ProjectTaskRepository projectTaskRepository)
  {
    _projectTaskRepository = projectTaskRepository;
  }

  [HttpGet]
  public IActionResult GetAllTasks()
  {
    var tasks = _projectTaskRepository.GetAllTasks();

    return Ok(new
    {
      Data = tasks,
      Message = "Tasks Fetched Successfully",
      Success = true
    });
  }

  [HttpPost]
  public IActionResult PostTask([FromBody] ProjectTaskDto newTask)
  {
    var task = _projectTaskRepository.AddTask(newTask);

    return Ok(new
    {
      Data = task,
      Message = "Task Added Successfully",
      Success = true
    });
  }

  [HttpDelete("{id}")]
  public IActionResult DeleteTask(Guid id)
  {
    _projectTaskRepository.DeleteTask(id);

    return Ok(new
    {
      Message = "Task Deleted Successfully",
      Success = true
    });
  }

  [HttpPut("{id}")]
  public IActionResult PutTask(
  Guid id,
  [FromBody] ProjectTaskDto updatedTask)
  {
    Console.WriteLine($"PUT ID: {id}");
    Console.WriteLine($"TITLE: {updatedTask.task_title}");
    Console.WriteLine($"COMPLETED: {updatedTask.task_completed}");

    var task = _projectTaskRepository.UpdateTask(id, updatedTask);

    return Ok(new
    {
      Data = task,
      Message = "Task Updated Successfully",
      Success = true
    });
  }
}