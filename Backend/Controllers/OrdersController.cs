using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class OrderController : ControllerBase
{

  private readonly OrderRepository _orderRepository;
  public OrderController(OrderRepository orderRepository)
  {
    _orderRepository = orderRepository;
  }

  [HttpGet]
  public IActionResult GetOrders()
  {
    var orderList = _orderRepository.GetAllOrders();
    return Ok(new { Data = orderList, Message = "Orders Fetched Successfully" });
  }

  [HttpPost]
  public IActionResult PostOrders([FromBody] OrderDto newOrder)
  {
    _orderRepository.AddOrder(newOrder);
    return Ok(new { Message = "Order Added Successfully" });
  }

  [HttpPut("{id}")]
  public IActionResult PutOrder(Guid id, [FromBody] OrderDto updatedOrder)
  {
    _orderRepository.UpdateOrders(id, updatedOrder);
    return Ok(new { Message = "Order Updated Successfully" });
  }

  [HttpDelete("{id}")]
  public IActionResult DeleteOrder(Guid id)
  {
    _orderRepository.DeleteOrders(id);
    return Ok(new { Message = "Order Deleted Successfully" });
  }
}