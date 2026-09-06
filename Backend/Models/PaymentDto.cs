using LibraryApi.Enums;

public class PaymentDto
{
  public required decimal payment_transaction_amount { get; set; }
  public Guid payment_order_id { get; set; }
  public required Guid payment_user_id { get; set; }
  public required PaymentMethod payment_method { get; set; }
  public required PaymentStatus payment_status { get; set; }
  public required PaymentType payment_type { get; set; }
  public required string payment_reference_id { get; set; }
  public required string payment_notes { get; set; }
}