public class OrderDto
{
  public required Guid order_user_id { get; set; }
  public required Guid order_book_id { get; set; }
  public required DateTime order_due_at { get; set; }
  public required decimal order_fine_amount { get; set; }
  public required Boolean order_has_fine { get; set; }
  public required Boolean order_is_damaged { get; set; }
}