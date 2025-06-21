"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Server,
  Database,
  Play,
  Square,
  CheckCircle,
  XCircle,
  Book,
  User,
  ShoppingCart,
  Search,
  Plus,
  AlertCircle,
} from "lucide-react"

// Simulated Database
const mockDatabase = {
  users: [
    {
      id: 1,
      name: "Admin User",
      email: "admin@bookstore.com",
      password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.",
      role: "ADMIN",
      createdAt: "2024-01-01T10:00:00",
      updatedAt: "2024-01-01T10:00:00",
    },
    {
      id: 2,
      name: "John Doe",
      email: "john@example.com",
      password: "$2a$10$hashed_password_here",
      role: "CUSTOMER",
      createdAt: "2024-01-10T14:30:00",
      updatedAt: "2024-01-10T14:30:00",
    },
    {
      id: 3,
      name: "Jane Smith",
      email: "jane@example.com",
      password: "$2a$10$another_hashed_password",
      role: "CUSTOMER",
      createdAt: "2024-01-15T09:15:00",
      updatedAt: "2024-01-15T09:15:00",
    },
  ],
  books: [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Fiction",
      isbn: "978-0-7432-7356-5",
      price: 12.99,
      description: "A classic American novel set in the Jazz Age.",
      stockQuantity: 50,
      imageUrl: "/placeholder.svg?height=200&width=150",
      createdAt: "2024-01-01T10:00:00",
      updatedAt: "2024-01-01T10:00:00",
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Fiction",
      isbn: "978-0-06-112008-4",
      price: 14.99,
      description: "A gripping tale of racial injustice and childhood innocence.",
      stockQuantity: 30,
      imageUrl: "/placeholder.svg?height=200&width=150",
      createdAt: "2024-01-01T10:01:00",
      updatedAt: "2024-01-01T10:01:00",
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      genre: "Dystopian Fiction",
      isbn: "978-0-452-28423-4",
      price: 13.99,
      description: "A dystopian social science fiction novel.",
      stockQuantity: 40,
      imageUrl: "/placeholder.svg?height=200&width=150",
      createdAt: "2024-01-01T10:02:00",
      updatedAt: "2024-01-01T10:02:00",
    },
    {
      id: 4,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      genre: "Romance",
      isbn: "978-0-14-143951-8",
      price: 11.99,
      description: "A romantic novel of manners.",
      stockQuantity: 25,
      imageUrl: "/placeholder.svg?height=200&width=150",
      createdAt: "2024-01-01T10:03:00",
      updatedAt: "2024-01-01T10:03:00",
    },
    {
      id: 5,
      title: "Harry Potter and the Philosopher's Stone",
      author: "J.K. Rowling",
      genre: "Fantasy",
      isbn: "978-0-7475-3269-9",
      price: 15.99,
      description: "The first book in the Harry Potter series.",
      stockQuantity: 60,
      imageUrl: "/placeholder.svg?height=200&width=150",
      createdAt: "2024-01-01T10:04:00",
      updatedAt: "2024-01-01T10:04:00",
    },
  ],
  orders: [
    {
      id: 1,
      userId: 2,
      totalAmount: 27.98,
      status: "PENDING",
      paymentStatus: "PENDING",
      createdAt: "2024-01-20T14:30:00",
      updatedAt: "2024-01-20T14:30:00",
      orderItems: [
        { id: 1, bookId: 1, quantity: 2, price: 12.99 },
        { id: 2, bookId: 3, quantity: 1, price: 13.99 },
      ],
    },
    {
      id: 2,
      userId: 3,
      totalAmount: 14.99,
      status: "CONFIRMED",
      paymentStatus: "PAID",
      createdAt: "2024-01-19T09:15:00",
      updatedAt: "2024-01-19T10:30:00",
      orderItems: [{ id: 3, bookId: 2, quantity: 1, price: 14.99 }],
    },
  ],
}

export default function BookstoreSimulation() {
  const [isServerRunning, setIsServerRunning] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [logs, setLogs] = useState<string[]>([])
  const [apiResponse, setApiResponse] = useState<any>(null)
  const [requestData, setRequestData] = useState<any>({})

  const addLog = (message: string, type: "INFO" | "ERROR" | "SUCCESS" = "INFO") => {
    const timestamp = new Date().toISOString()
    const logEntry = `[${timestamp}] ${type}: ${message}`
    setLogs((prev) => [...prev, logEntry])
  }

  const startServer = () => {
    setIsServerRunning(true)
    setLogs([])
    addLog("Starting Spring Boot Application...", "INFO")
    addLog("Initializing Spring Security...", "INFO")
    addLog("Connecting to MySQL Database...", "INFO")
    addLog("Loading sample data...", "INFO")
    addLog("JWT Configuration loaded", "INFO")
    addLog("Swagger UI available at http://localhost:8080/swagger-ui.html", "SUCCESS")
    addLog("Bookstore Management System started successfully on port 8080", "SUCCESS")
  }

  const stopServer = () => {
    setIsServerRunning(false)
    setCurrentUser(null)
    setApiResponse(null)
    addLog("Shutting down Spring Boot Application...", "INFO")
  }

  // API Simulation Functions
  const simulateLogin = () => {
    if (!isServerRunning) {
      addLog("Server not running! Start the server first.", "ERROR")
      return
    }

    addLog("POST /api/login - Processing authentication...", "INFO")

    const user = mockDatabase.users.find((u) => u.email === "admin@bookstore.com")
    if (user) {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbkBib29rc3RvcmUuY29tIiwiaWF0IjoxNzA2MTg0MDAwLCJleHAiOjE3MDYyNzA0MDB9.example-jwt-token"

      const response = {
        token,
        type: "Bearer",
        userId: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      }

      setCurrentUser(user)
      setApiResponse(response)
      addLog(`Authentication successful for ${user.email}`, "SUCCESS")
      addLog("JWT token generated and returned", "SUCCESS")
    }
  }

  const simulateGetBooks = (page = 0, size = 10, search = "") => {
    if (!isServerRunning) {
      addLog("Server not running! Start the server first.", "ERROR")
      return
    }

    addLog(`GET /api/books?page=${page}&size=${size}&search=${search}`, "INFO")

    let books = mockDatabase.books
    if (search) {
      books = books.filter(
        (book) =>
          book.title.toLowerCase().includes(search.toLowerCase()) ||
          book.author.toLowerCase().includes(search.toLowerCase()),
      )
      addLog(`Filtering books by search term: "${search}"`, "INFO")
    }

    const startIndex = page * size
    const endIndex = startIndex + size
    const paginatedBooks = books.slice(startIndex, endIndex)

    const response = {
      content: paginatedBooks,
      pageable: {
        pageNumber: page,
        pageSize: size,
        sort: { sorted: false, unsorted: true },
      },
      totalElements: books.length,
      totalPages: Math.ceil(books.length / size),
      first: page === 0,
      last: page >= Math.ceil(books.length / size) - 1,
      numberOfElements: paginatedBooks.length,
    }

    setApiResponse(response)
    addLog(`Returned ${paginatedBooks.length} books out of ${books.length} total`, "SUCCESS")
  }

  const simulateCreateOrder = () => {
    if (!isServerRunning) {
      addLog("Server not running! Start the server first.", "ERROR")
      return
    }

    if (!currentUser) {
      addLog("POST /api/orders - Authentication required", "ERROR")
      setApiResponse({
        timestamp: new Date().toISOString(),
        status: 401,
        error: "Unauthorized",
        message: "Access denied. Authentication required.",
      })
      return
    }

    addLog("POST /api/orders - Creating new order...", "INFO")

    const orderItems = [
      { bookId: 1, quantity: 2 },
      { bookId: 3, quantity: 1 },
    ]

    // Simulate stock checking
    let totalAmount = 0
    const processedItems = []

    for (const item of orderItems) {
      const book = mockDatabase.books.find((b) => b.id === item.bookId)
      if (book) {
        if (book.stockQuantity >= item.quantity) {
          totalAmount += book.price * item.quantity
          processedItems.push({
            bookId: book.id,
            bookTitle: book.title,
            bookAuthor: book.author,
            quantity: item.quantity,
            price: book.price,
          })
          addLog(`Stock check passed for "${book.title}" - ${item.quantity} units`, "INFO")
        } else {
          addLog(`Insufficient stock for "${book.title}"`, "ERROR")
          return
        }
      }
    }

    const newOrder = {
      id: mockDatabase.orders.length + 1,
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      orderItems: processedItems,
      totalAmount: Number.parseFloat(totalAmount.toFixed(2)),
      status: "PENDING",
      paymentStatus: "PENDING",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    mockDatabase.orders.push(newOrder)
    setApiResponse(newOrder)
    addLog(`Order created successfully with ID: ${newOrder.id}`, "SUCCESS")
    addLog(`Total amount: $${newOrder.totalAmount}`, "INFO")
  }

  const simulateGetOrders = () => {
    if (!isServerRunning) {
      addLog("Server not running! Start the server first.", "ERROR")
      return
    }

    if (!currentUser) {
      addLog("GET /api/orders - Authentication required", "ERROR")
      setApiResponse({
        timestamp: new Date().toISOString(),
        status: 401,
        error: "Unauthorized",
        message: "Access denied. Authentication required.",
      })
      return
    }

    if (currentUser.role !== "ADMIN") {
      addLog("GET /api/orders - Admin access required", "ERROR")
      setApiResponse({
        timestamp: new Date().toISOString(),
        status: 403,
        error: "Forbidden",
        message: "Access denied. Admin role required.",
      })
      return
    }

    addLog("GET /api/orders - Fetching all orders (Admin access)", "INFO")

    const ordersWithDetails = mockDatabase.orders.map((order) => {
      const user = mockDatabase.users.find((u) => u.id === order.userId)
      return {
        ...order,
        userName: user?.name,
        userEmail: user?.email,
        orderItems: order.orderItems.map((item) => {
          const book = mockDatabase.books.find((b) => b.id === item.bookId)
          return {
            ...item,
            bookTitle: book?.title,
            bookAuthor: book?.author,
          }
        }),
      }
    })

    const response = {
      content: ordersWithDetails,
      totalElements: ordersWithDetails.length,
      totalPages: 1,
      first: true,
      last: true,
    }

    setApiResponse(response)
    addLog(`Retrieved ${ordersWithDetails.length} orders`, "SUCCESS")
  }

  const simulateError = (errorType: string) => {
    if (!isServerRunning) {
      addLog("Server not running! Start the server first.", "ERROR")
      return
    }

    switch (errorType) {
      case "404":
        addLog("GET /api/books/999 - Book not found", "ERROR")
        setApiResponse({
          timestamp: new Date().toISOString(),
          status: 404,
          error: "Not Found",
          message: "Book not found with id: 999",
        })
        break
      case "validation":
        addLog("POST /api/books - Validation failed", "ERROR")
        setApiResponse({
          timestamp: new Date().toISOString(),
          status: 400,
          error: "Validation Failed",
          message: "Invalid input data",
          validationErrors: {
            title: "Title is required",
            author: "Author is required",
            price: "Price must be greater than 0",
            isbn: "ISBN is required",
          },
        })
        break
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">🚀 Spring Boot Bookstore API</h1>
          <p className="text-lg text-gray-300 mb-4">Live Server Simulation - See Real Output</p>
          <div className="flex justify-center gap-2">
            <Badge variant="secondary">Spring Boot 3.2.0</Badge>
            <Badge variant="secondary">MySQL Database</Badge>
            <Badge variant="secondary">JWT Security</Badge>
          </div>
        </div>

        {/* Server Control */}
        <Card className="mb-6 bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Server className="w-6 h-6" />
                <div>
                  <div className="font-semibold">Spring Boot Server</div>
                  <div className="text-sm text-gray-400">
                    Status:{" "}
                    {isServerRunning ? (
                      <span className="text-green-400 flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        Running on port 8080
                      </span>
                    ) : (
                      <span className="text-red-400 flex items-center gap-1">
                        <XCircle className="w-4 h-4" />
                        Stopped
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                {!isServerRunning ? (
                  <Button onClick={startServer} className="bg-green-600 hover:bg-green-700">
                    <Play className="w-4 h-4 mr-2" />
                    Start Server
                  </Button>
                ) : (
                  <Button onClick={stopServer} variant="destructive">
                    <Square className="w-4 h-4 mr-2" />
                    Stop Server
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* API Controls */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                API Endpoints
              </CardTitle>
              <CardDescription>Test live API endpoints</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Authentication</h4>
                  <Button
                    onClick={simulateLogin}
                    disabled={!isServerRunning}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <User className="w-4 h-4 mr-2" />
                    POST /api/login
                  </Button>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Books</h4>
                  <Button
                    onClick={() => simulateGetBooks(0, 10)}
                    disabled={!isServerRunning}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <Book className="w-4 h-4 mr-2" />
                    GET /api/books
                  </Button>
                  <Button
                    onClick={() => simulateGetBooks(0, 10, "gatsby")}
                    disabled={!isServerRunning}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    GET /api/books?search=gatsby
                  </Button>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Orders</h4>
                  <Button
                    onClick={simulateCreateOrder}
                    disabled={!isServerRunning}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    POST /api/orders
                  </Button>
                  <Button
                    onClick={simulateGetOrders}
                    disabled={!isServerRunning}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    GET /api/orders (Admin)
                  </Button>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Error Examples</h4>
                  <Button
                    onClick={() => simulateError("404")}
                    disabled={!isServerRunning}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <AlertCircle className="w-4 h-4 mr-2" />
                    404 Not Found
                  </Button>
                  <Button
                    onClick={() => simulateError("validation")}
                    disabled={!isServerRunning}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Validation Error
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Output Display */}
          <Card className="lg:col-span-2 bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle>📊 Live Output</CardTitle>
              <CardDescription>Real-time API responses and server logs</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="response" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="response">API Response</TabsTrigger>
                  <TabsTrigger value="logs">Server Logs</TabsTrigger>
                  <TabsTrigger value="database">Database</TabsTrigger>
                </TabsList>

                <TabsContent value="response" className="mt-4">
                  <ScrollArea className="h-96 w-full rounded-md border border-slate-600 bg-slate-900">
                    <div className="p-4">
                      {apiResponse ? (
                        <pre className="text-sm font-mono text-green-400 whitespace-pre-wrap">
                          {JSON.stringify(apiResponse, null, 2)}
                        </pre>
                      ) : (
                        <div className="text-center text-gray-500 py-8">
                          <Database className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>No API response yet. Test an endpoint to see output.</p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="logs" className="mt-4">
                  <ScrollArea className="h-96 w-full rounded-md border border-slate-600 bg-slate-900">
                    <div className="p-4 font-mono text-sm">
                      {logs.length > 0 ? (
                        logs.map((log, index) => (
                          <div
                            key={index}
                            className={`mb-1 ${
                              log.includes("ERROR")
                                ? "text-red-400"
                                : log.includes("SUCCESS")
                                  ? "text-green-400"
                                  : "text-gray-300"
                            }`}
                          >
                            {log}
                          </div>
                        ))
                      ) : (
                        <div className="text-center text-gray-500 py-8">
                          <Server className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>Server logs will appear here when you start the server.</p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="database" className="mt-4">
                  <ScrollArea className="h-96 w-full rounded-md border border-slate-600 bg-slate-900">
                    <div className="p-4">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-green-400 mb-2">
                            Users Table ({mockDatabase.users.length} records)
                          </h4>
                          <div className="text-xs font-mono text-gray-300">
                            {mockDatabase.users.map((user) => (
                              <div key={user.id} className="mb-1">
                                ID: {user.id} | {user.name} | {user.email} | {user.role}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-blue-400 mb-2">
                            Books Table ({mockDatabase.books.length} records)
                          </h4>
                          <div className="text-xs font-mono text-gray-300">
                            {mockDatabase.books.map((book) => (
                              <div key={book.id} className="mb-1">
                                ID: {book.id} | "{book.title}" by {book.author} | Stock: {book.stockQuantity}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-purple-400 mb-2">
                            Orders Table ({mockDatabase.orders.length} records)
                          </h4>
                          <div className="text-xs font-mono text-gray-300">
                            {mockDatabase.orders.map((order) => (
                              <div key={order.id} className="mb-1">
                                ID: {order.id} | User: {order.userId} | Total: ${order.totalAmount} | Status:{" "}
                                {order.status}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Status Bar */}
        <Card className="mt-6 bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <span>Server: {isServerRunning ? "🟢 Online" : "🔴 Offline"}</span>
                <span>Database: {isServerRunning ? "🟢 Connected" : "🔴 Disconnected"}</span>
                <span>
                  Auth: {currentUser ? `🟢 ${currentUser.name} (${currentUser.role})` : "🔴 Not Authenticated"}
                </span>
              </div>
              <div className="text-gray-400">Spring Boot 3.2.0 | MySQL | JWT | Swagger</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
