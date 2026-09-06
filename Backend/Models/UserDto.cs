using LibraryApi.Enum;

public class UserDto
{
  public required string user_name { get; set; }
  public required string user_email { get; set; }
  public required string user_contact { get; set; }
  public required string user_address { get; set; }
  public required UserRole user_role { get; set; }

}