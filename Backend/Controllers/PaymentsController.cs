using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class PaymentsController : ControllerBase
{

  private readonly PaymentRepository _paymentRepository;
  public PaymentsController(PaymentRepository paymentRepository)
  {
    _paymentRepository = paymentRepository;
  }

  [HttpGet]
  public IActionResult GetPayments()
  {
    var userList = _paymentRepository.GetAllPayments();
    return Ok(new { Data = userList, Message = "Payment Fetched Successfully" });
  }

  [HttpPost]
  public IActionResult PostPayment([FromBody] PaymentDto newPayment)
  {
    _paymentRepository.AddPayment(newPayment);
    return Ok(new { Message = "Payment Added Successfully" });
  }

  [HttpPut("{id}")]
  public IActionResult PutPayment(Guid id, [FromBody] PaymentDto updatedPayment)
  {
    _paymentRepository.UpdatePayment(id, updatedPayment);
    return Ok(new { Message = "Payment Updated Successfully" });
  }

  [HttpDelete("{id}")]
  public IActionResult DeletePayment(Guid id)
  {
    _paymentRepository.DeletePayment(id);
    return Ok(new { Message = "Payment Deleted Successfully" });
  }
}