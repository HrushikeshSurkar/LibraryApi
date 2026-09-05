var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();
builder.Services.AddTransient<DatabaseHelper>();
builder.Services.AddScoped<BookRepository>();
builder.Services.AddScoped<UserRepository>();

var app = builder.Build();

app.UseExceptionHandler();
app.MapControllers();

app.Run();