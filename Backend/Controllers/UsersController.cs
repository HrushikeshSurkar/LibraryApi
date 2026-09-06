using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{

  private readonly UserRepository _userRepository;
  public UsersController(UserRepository userRepository)
  {
    _userRepository = userRepository;
  }

  [HttpGet]
  public IActionResult GetUsers()
  {
    var userList = _userRepository.GetAllUsers();
    return Ok(new { Data = userList, Message = "Users Fetched Successfully" });
  }

  [HttpPost]
  public IActionResult PostUsers([FromBody] UserDto newUser)
  {
    _userRepository.AddUser(newUser);
    return Ok(new { Message = "User Added Successfully" });
  }

  [HttpPut("{id}")]
  public IActionResult PutUsers(Guid id, [FromBody] UserDto updatedUser)
  {
    _userRepository.UpdateUser(id, updatedUser);
    return Ok(new { Message = "User Updated Successfully" });
  }

  [HttpDelete("{id}")]
  public IActionResult DeleteUsers(Guid id)
  {
    _userRepository.DeleteUser(id);
    return Ok(new { Message = "User Deleted Successfully" });
  }
}