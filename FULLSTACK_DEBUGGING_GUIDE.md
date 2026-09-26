# 🚀 Ultimate Full-Stack Debugging & Confidence-Building Learning Guide
**Project:** LibraryApi (Angular v20 Frontend + .NET 9 Backend + PostgreSQL Database)

---

## ⚡ Pre-Flight Launch Checklist & Productivity Hacks

Before starting your debugging journey, we set up these 3 developer productivity boosts for you:

1. **One-Click F5 Debugging Pre-configured:**
   - We created [.vscode/launch.json](file:///d:/all%20Projects/Projects/2026/FullStack/LibraryApi/.vscode/launch.json) and [.vscode/tasks.json](file:///d:/all%20Projects/Projects/2026/FullStack/LibraryApi/.vscode/tasks.json).
   - Pressing **`F5`** in VS Code will automatically build your .NET API, attach the C# debugger, and open Swagger UI (`/swagger`) in your browser!
2. **Backend Hot Reload (`dotnet watch`):**
   - Instead of running `dotnet run` (which requires manually stopping and restarting the server when you change C# code), run:
     ```powershell
     cd Backend
     dotnet watch
     ```
   - This automatically re-compiles and reloads your backend every time you save a C# file!
3. **Database Pre-Flight Check:**
   - Ensure your PostgreSQL service is running before launching the API. If your backend throws a `SocketException` on startup, check your connection string in [appsettings.Development.json](file:///d:/all%20Projects/Projects/2026/FullStack/LibraryApi/Backend/appsettings.Development.json).

---

## 🚨 Golden Rules: How to Use AI (ChatGPT / AI Assistant) vs. How to Learn Debugging Yourself

To get 100% of the value out of this project and transition from relying on AI code generation to becoming a self-sufficient full-stack engineer, follow these strict rules:

### ❌ WHAT NOT TO DO (Avoid these traps):
- ❌ **DO NOT ask AI to write the code for you during DIY Challenges:** Asking *"AI, write EF Core migration for UserRepository"* will prevent your brain from building muscle memory.
- ❌ **DO NOT copy-paste error messages blindly to AI:** Don't just paste `500 Internal Server Error` into ChatGPT without placing a breakpoint in VS Code first.
- ❌ **DO NOT guess code changes randomly:** Never edit code based on "guesses" without inspecting the live variable values in your browser or backend debugger first.

### ✅ WHAT YOU MUST DO (To build real engineering confidence):
- ✅ **ALWAYS inspect with DevTools / VS Code Debugger FIRST:** When a bug occurs, hit `F12` or press `F5` in VS Code to see what variable is `null` or broken.
- ✅ **Use AI as a Tutor, NOT a Code Generator:** Ask AI: *"Why does `reader.GetGuid(0)` throw an InvalidCastException when reading a column?"* instead of *"Fix my repository"*.
- ✅ **Type code out manually during DIY challenges:** Typing the code line-by-line builds memory for C#, LINQ, Angular Signals, and TypeScript syntax.

---

## 🎯 Learning Methodology: Progressive Mastery Pattern
This guide uses a **3-tier learning framework**:

1. 🟢 **Level 1–3: Guided Foundations (Learn the Tools)** – Complete step-by-step instructions showing *how* tools (Chrome DevTools, VS Code Debugger, SQL execution) work so you feel comfortable.
2. 🟡 **Level 4–5: Guided Diagnostics (Understand the Patterns)** – Real-world error matrix, network status codes, and async memory safety patterns.
3. 🔴 **DIY Confidence Challenges (Do It Yourself)** – Independent hands-on tasks where **no full solution is given upfront**. You will apply your debugging skills to fix bugs, implement logging in remaining controllers, and execute DB migrations on your own!

---

## 🗺️ Master Level-Wise Debugging Checklist & Walkthroughs

---

### 🔹 Level 1: Frontend Debugging (Angular UI & Browser DevTools)
> **Goal:** Understand how your UI state changes, how to inspect network calls, and how to pause code execution using breakpoints.

#### 1.1 Chrome / Edge Developer Tools Setup
- [ ] Open DevTools (`F12`).
- [ ] Practice Console methods (`console.log`, `console.table`, `console.error`, `console.trace`).
- [ ] Use `debugger;` statement to pause UI execution.

**📖 How to do this:**
1. Open your browser and navigate to your Angular UI (`http://localhost:4200`).
2. Press **`F12`** (or Right-Click on the page -> select **Inspect**).
3. Select the **Console** tab at the top of the DevTools window.
4. In your Angular component (e.g. `src/app/pages/book-list/book-list.ts`), add logging:
   ```typescript
   export class BookListComponent {
     fetchBooks() {
       console.log('Fetching books...');
       console.table(this.books()); // Formats your array of books into an interactive table!
       console.error('Test error message');
       console.trace('Function call stack trace');
     }
   }
   ```
5. **How to use `debugger;`:**
   - Add `debugger;` on any line of TypeScript code:
     ```typescript
     loadData() {
       const page = 1;
       debugger; // <--- Execution stops HERE automatically!
       this.bookService.getBooks(page).subscribe();
     }
     ```
   - Ensure DevTools is open, then click the button in your UI.
   - The browser screen dims with a banner: *"Paused in debugger"*. You can hover your mouse over variables (`page`, `this.bookService`) to view live in-memory values!

#### 1.2 Network Tab (API Request & Response Tracking)
- [ ] Inspect HTTP requests in the Network tab.
- [ ] Verify Headers, Status Codes, Request Payload, and Response Body.

**📖 How to do this:**
1. In DevTools (`F12`), click the **Network** tab.
2. Click the **Fetch/XHR** filter button in the sub-toolbar (this filters out CSS/images and shows only API calls).
3. Perform an action in your Angular app (e.g., click "Delete Book" or search).
4. A new row will appear in the network table (e.g., `books`). Click on it to open the detail panel:
   - **Headers Tab:** Inspect `Request URL` (`http://localhost:5000/api/books`), `Request Method` (`GET`, `POST`, `DELETE`), and `Status Code` (`200 OK`, `400 Bad Request`, `500 Server Error`).
   - **Payload Tab:** Check exact JSON data sent from Angular to .NET API.
   - **Response Tab:** See the exact raw JSON output returned by your C# controller.

#### 1.3 Sources Tab & Breakpoints
- [ ] Open Sources tab and place breakpoints on line numbers.
- [ ] Step through code execution line-by-line.

**📖 How to do this:**
1. In DevTools (`F12`), click the **Sources** tab.
2. Press **`Ctrl + P`** (or `Cmd + P` on Mac) to open the file search bar.
3. Type the file name (e.g., `book-list`) and press Enter to open `book-list.ts`.
4. Click directly on a line number (e.g., line 18) to set a red dot breakpoint.
5. Click the UI element that triggers that code. The browser will freeze right at line 18!
6. Use the execution controls in the top-right panel:
   - **Resume (`F8`):** Continue running code until next breakpoint.
   - **Step Over (`F10`):** Move to the next line of code without entering functions.
   - **Step Into (`F11`):** Jump inside the function being called.
   - **Step Out (`Shift + F11`):** Exit current function.

---

### 🔹 Level 2: Backend API Debugging (.NET 9 Web API & C#)
> **Goal:** Trace HTTP requests from ASP.NET Core Controllers down to Repositories, inspect payload parameters, and log execution details.

#### 2.1 Structured Logging with `ILogger<T>`
- [ ] Inject `ILogger<T>` into C# controllers and repositories.
- [ ] Log informational events and exceptions to terminal output.

**📖 How to do this:**
1. Open [BooksController.cs](file:///d:/all%20Projects/Projects/2026/FullStack/LibraryApi/Backend/Controllers/BooksController.cs).
2. Inject `ILogger<BooksController>` into constructor:
   ```csharp
   private readonly BookRepository _bookRepo;
   private readonly ILogger<BooksController> _logger;

   public BooksController(BookRepository bookRepo, ILogger<BooksController> logger)
   {
       _bookRepo = bookRepo;
       _logger = logger;
   }
   ```
3. Inside your controller methods, write logs:
   ```csharp
   [HttpGet]
   public IActionResult GetBooks([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
   {
       _logger.LogInformation("GET /api/books called with pageNumber={Page}, pageSize={Size}", pageNumber, pageSize);
       
       try
       {
           var result = _bookRepo.GetAllBooks(pageNumber, pageSize);
           return Ok(result);
       }
       catch (Exception ex)
       {
           _logger.LogError(ex, "Error occurred while fetching books.");
           return StatusCode(500, "Internal server error");
       }
   }
   ```
4. Run your backend in terminal (`dotnet run`). When a request comes in, watch your terminal window display colored logs with parameters filled in!

#### 2.2 VS Code C# Breakpoint Debugging
- [ ] Configure VS Code C# Debugger.
- [ ] Set breakpoints in C# controllers and repositories.
- [ ] Inspect local variables and watch expressions live.

**📖 How to do this:**
1. Ensure the **C# Dev Kit** or **C# Extension** is installed in VS Code.
2. Open [BookRepository.cs](file:///d:/all%20Projects/Projects/2026/FullStack/LibraryApi/Backend/Repositories/BookRepository.cs).
3. Click to the left of line 16 (`int offset = (pageNumber - 1) * pageSize;`) to set a red breakpoint dot.
4. Press **`F5`** (or go to **Run and Debug** -> click **Start Debugging**).
5. Send an HTTP request from your browser, Swagger UI, or Angular app.
6. VS Code will immediately gain focus and highlight line 16 in yellow!
7. Check the left panel:
   - **VARIABLES -> Locals:** View values of `pageNumber`, `pageSize`, `offset`.
   - **WATCH:** Click `+` and type `pageSize * 2` to evaluate live C# code while paused.

#### 2.3 Standalone API Testing with Swagger & HTTP Files
- [ ] Test endpoints using Swagger UI.
- [ ] Execute requests using `.http` files inside VS Code.

**📖 How to do this:**
1. Open Swagger at `http://localhost:5000/swagger` in your browser. Click **Try it out** -> **Execute** to test endpoints without using Angular.
2. Open [LibraryApi.http](file:///d:/all%20Projects/Projects/2026/FullStack/LibraryApi/Backend/LibraryApi.http) in VS Code.
3. Write request syntax:
   ```http
   GET http://localhost:5000/api/books?pageNumber=1&pageSize=5
   Accept: application/json
   ```
4. Click the small **"Send Request"** button directly above the line in VS Code editor. A response pane opens displaying exact headers and JSON response body!

---

### 🔹 Level 3: Database Debugging (PostgreSQL & SQL Execution)
> **Goal:** Inspect raw SQL statements, parameters, execution errors, and database table records.

#### 3.1 Inspecting ADO.NET SQL Query Execution
- [ ] Print SQL queries and parameters before execution.
- [ ] Catch `NpgsqlException` specifically to capture SQL syntax or constraint errors.

**📖 How to do this:**
1. Open [BookRepository.cs](file:///d:/all%20Projects/Projects/2026/FullStack/LibraryApi/Backend/Repositories/BookRepository.cs).
2. Right before calling `command.ExecuteReader()`, print or log the raw SQL query and bound parameter values:
   ```csharp
   Console.WriteLine($"[EXECUTING SQL]: {sqlQuery}");
   Console.WriteLine($"[PARAMETERS]: @limit={pageSize}, @offset={offset}");
   ```
3. Surround the database call with explicit `NpgsqlException` handling:
   ```csharp
   try
   {
       using var reader = command.ExecuteReader();
       // ...
   }
   catch (NpgsqlException ex)
   {
       _logger.LogError("PostgreSQL Error: Message={Msg} | SqlState={State} | Detail={Detail}", 
           ex.Message, ex.SqlState, ex.Detail);
       throw;
   }
   ```
4. If a SQL table or column doesn't exist, `SqlState` will tell you the exact Postgres error code (e.g. `42P01` = Undefined Table).

---

### 🔹 Level 4: Common HTTP & Network Error Diagnostic Matrix

| Error Code / Symptom | Root Cause | 📖 How to Fix |
| :--- | :--- | :--- |
| **CORS Error** (`Access to fetch blocked by CORS policy`) | Backend is missing `AllowAngular` policy or port mismatch (`http://localhost:4200` vs backend). | Check `builder.Services.AddCors()` and `app.UseCors("AllowAngular")` in [Program.cs](file:///d:/all%20Projects/Projects/2026/FullStack/LibraryApi/Backend/Program.cs). |
| **400 Bad Request** | Request body JSON structure does not match backend DTO, or route parameter type mismatch. | Compare DevTools **Network -> Payload** tab with C# DTO class properties. |
| **404 Not Found** | URL path mismatch (e.g. `/api/book` instead of `/api/books`) or route action attribute issue. | Verify `[Route("api/[controller]")]` in [BooksController.cs](file:///d:/all%20Projects/Projects/2026/FullStack/LibraryApi/Backend/Controllers/BooksController.cs). |
| **415 Unsupported Media Type** | Missing `Content-Type: application/json` header in POST/PUT request. | Ensure Angular `HttpClient` sends default JSON content headers. |
| **500 Internal Server Error** | Unhandled exception in C# code (e.g. `NullReferenceException`, DB connection failure, type cast error). | Check terminal output running `dotnet run` or inspect backend exception logs. |
| **504 Gateway Timeout** | Database query is locked, deadlock occurred, or backend is stuck in an infinite loop. | Check PostgreSQL active queries or C# async blocking (`Task.Result`). |

---

## 🥊 Do-It-Yourself (DIY) Confidence-Building Challenges

> ⚠️ **NO SPOON-FEEDING HERE!** Follow the **Golden Rules** above. Use your debugging tools to solve these tasks on your own.

---

### 🔴 Challenge 1: The Mysterious "Undefined ID" Bug (UI Debugging)
- **Task:** 
  1. Open your Angular application in Chrome.
  2. Put a `debugger;` statement inside your Angular `deleteBook(id)` method.
  3. Intentionally pass an incorrect or missing `id` property from the template.
  4. Use the DevTools **Console & Sources tab** to inspect `id` before the HTTP request fires.
  5. **Goal:** Identify why `id` is `undefined` before sending a broken `DELETE /api/books/undefined` call to your backend!

---

### 🔴 Challenge 2: Implement Logging in `UsersController` & `UsersRepository` (Backend Logging)
- **Task:** 
  1. Open [UsersController.cs](file:///d:/all%20Projects/Projects/2026/FullStack/LibraryApi/Backend/Controllers/UsersController.cs) and [UsersRepository.cs](file:///d:/all%20Projects/Projects/2026/FullStack/LibraryApi/Backend/Repositories/UserRepository.cs).
  2. Inject `ILogger<UsersController>` into `UsersController`.
  3. Add `LogInformation` logs when a user attempts to register or log in.
  4. Add `LogError` handling inside a `try/catch` block for database exceptions.
  5. **Verification:** Trigger user registration via Swagger and verify that your custom logs appear in your terminal.

---

### 🔴 Challenge 3: Perform EF Core Migration for `UserRepository` (DB Migration)
- **Task:**
  1. In the guided example, we showed how to migrate `BookRepository` to EF Core.
  2. Now **YOU** do it for [UserRepository.cs](file:///d:/all%20Projects/Projects/2026/FullStack/LibraryApi/Backend/Repositories/UserRepository.cs)!
  3. Add `DbSet<UserDto> Users { get; set; }` inside `LibraryDbContext.cs`.
  4. Refactor `UserRepository` to replace raw SQL strings (`NpgsqlCommand`) with EF Core LINQ queries (`_context.Users.Add()`, `_context.Users.FirstOrDefault()`).
  5. **Goal:** Run the app and ensure user creation and retrieval work seamlessly without raw SQL strings!

---

### 🔴 Challenge 4: Trace an Intentional SQL Column Mismatch Error (DB Debugging)
- **Task:**
  1. Open [BookRepository.cs](file:///d:/all%20Projects/Projects/2026/FullStack/LibraryApi/Backend/Repositories/BookRepository.cs).
  2. Change `reader.GetGuid(0)` to `reader.GetInt32(0)` (which forces a type mismatch error).
  3. Run the backend and fetch books from Swagger.
  4. Watch the API crash with a 500 status code.
  5. Use VS Code debugger (F5 breakpoint) to pause inside `GetAllBooks` and identify the exact line that threw `InvalidCastException`.
  6. Fix the bug and resume execution!

---
*Happy Debugging! Follow the Golden Rules: use AI as a conceptual tutor, inspect memory using debuggers first, and build genuine coding confidence!*
