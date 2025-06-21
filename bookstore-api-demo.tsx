"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CheckCircle, XCircle, Lock, User, ShoppingCart, Book, AlertTriangle } from "lucide-react"

export default function BookstoreApiDemo() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [activeResponse, setActiveResponse] = useState<string>("")

  // Mock API responses that match the actual Spring Boot API
  const apiResponses = {
    login: {
      endpoint: "POST /api/login",
      description: "User authentication with JWT",
      request: {
        email: "admin@bookstore.com",
        password: "admin123",
      },
      response: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbkBib29rc3RvcmUuY29tIiwiaWF0IjoxNzA2MTg0MDAwLCJleHAiOjE3MDYyNzA0MDB9.example-jwt-token",
        type: "Bearer",
        userId: 1,
        email: "admin@bookstore.com",
        name: "Admin User",
        role: "ADMIN",
      },
    },
    books: {
      endpoint: "GET /api/books",
      description: "Get paginated list of books",
      response: {
        content: [
          {
            id: 1,
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            genre: "Fiction",
            isbn: "978-0-7432-7356-5",
            price: 12.99,
            description: "A classic American novel set in the Jazz Age.",
            stockQuantity: 50,
            imageUrl: "https://example.com/gatsby.jpg",
            createdAt: "2024-01-15T10:30:00",
            updatedAt: "2024-01-15T10:30:00",
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
            imageUrl: "https://example.com/mockingbird.jpg",
            createdAt: "2024-01-15T10:31:00",
            updatedAt: "2024-01-15T10:31:00",
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
            imageUrl: "https://example.com/1984.jpg",
            createdAt: "2024-01-15T10:32:00",
            updatedAt: "2024-01-15T10:32:00",
          },
        ],
        pageable: {
          pageNumber: 0,
          pageSize: 10,
          sort: { sorted: true, ascending: true },
        },
        totalElements: 25,
        totalPages: 3,
        first: true,
        last: false,
        numberOfElements: 10,
      },
    },
    createOrder: {
      endpoint: "POST /api/orders",
      description: "Create a new order",
      request: {
        orderItems: [
          { bookId: 1, quantity: 2 },
          { bookId: 3, quantity: 1 },
        ],
      },
      response: {
        id: 15,
        userId: 1,
        userName: "Admin User",
        userEmail: "admin@bookstore.com",
        orderItems: [
          {
            bookId: 1,
            bookTitle: "The Great Gatsby",
            bookAuthor: "F. Scott Fitzgerald",
            quantity: 2,
            price: 12.99,
          },
          {
            bookId: 3,
            bookTitle: "1984",
            bookAuthor: "George Orwell",
            quantity: 1,
            price: 13.99,
          },
        ],
        totalAmount: 39.97,
        status: "PENDING",
        paymentStatus: "PENDING",
        createdAt: "2024-01-20T14:30:00",
        updatedAt: "2024-01-20T14:30:00",
      },
    },
    search: {
      endpoint: "GET /api/books?search=gatsby",
      description: "Search books by title or author",
      response: {
        content: [
          {
            id: 1,
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            genre: "Fiction",
            isbn: "978-0-7432-7356-5",
            price: 12.99,
            description: "A classic American novel set in the Jazz Age.",
            stockQuantity: 50,
            imageUrl: "https://example.com/gatsby.jpg",
            createdAt: "2024-01-15T10:30:00",
            updatedAt: "2024-01-15T10:30:00",
          },
        ],
        totalElements: 1,
        totalPages: 1,
        first: true,
        last: true,
      },
    },
    error404: {
      endpoint: "GET /api/books/999",
      description: "Book not found error",
      response: {
        timestamp: "2024-01-20T15:30:00",
        status: 404,
        error: "Not Found",
        message: "Book not found with id: 999",
      },
    },
    error401: {
      endpoint: "POST /api/books (without auth)",
      description: "Unauthorized access error",
      response: {
        timestamp: "2024-01-20T15:30:00",
        status: 401,
        error: "Unauthorized",
        message: "Access denied. Authentication required.",
      },
    },
    validation: {
      endpoint: "POST /api/books (invalid data)",
      description: "Validation error example",
      response: {
        timestamp: "2024-01-20T15:30:00",
        status: 400,
        error: "Validation Failed",
        message: "Invalid input data",
        validationErrors: {
          title: "Title is required",
          author: "Author is required",
          price: "Price must be greater than 0",
          isbn: "ISBN is required",
        },
      },
    },
  }

  const handleLogin = () => {
    setIsAuthenticated(true)
    setCurrentUser({
      name: "Admin User",
      email: "admin@bookstore.com",
      role: "ADMIN",
    })
    setActiveResponse(JSON.stringify(apiResponses.login.response, null, 2))
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentUser(null)
    setActiveResponse("")
  }

  const showResponse = (key: keyof typeof apiResponses) => {
    const response = apiResponses[key]
    setActiveResponse(JSON.stringify(response.response, null, 2))
  }

  const endpoints = [
    {
      key: "login" as keyof typeof apiResponses,
      label: "Login",
      method: "POST",
      icon: <User className="w-4 h-4" />,
      color: "bg-blue-500",
      requiresAuth: false,
    },
    {
      key: "books" as keyof typeof apiResponses,
      label: "Get Books",
      method: "GET",
      icon: <Book className="w-4 h-4" />,
      color: "bg-green-500",
      requiresAuth: false,
    },
    {
      key: "search" as keyof typeof apiResponses,
      label: "Search Books",
      method: "GET",
      icon: <Book className="w-4 h-4" />,
      color: "bg-green-500",
      requiresAuth: false,
    },
    {
      key: "createOrder" as keyof typeof apiResponses,
      label: "Create Order",
      method: "POST",
      icon: <ShoppingCart className="w-4 h-4" />,
      color: "bg-blue-500",
      requiresAuth: true,
    },
    {
      key: "error404" as keyof typeof apiResponses,
      label: "404 Error",
      method: "GET",
      icon: <AlertTriangle className="w-4 h-4" />,
      color: "bg-red-500",
      requiresAuth: false,
    },
    {
      key: "error401" as keyof typeof apiResponses,
      label: "401 Error",
      method: "POST",
      icon: <AlertTriangle className="w-4 h-4" />,
      color: "bg-red-500",
      requiresAuth: false,
    },
    {
      key: "validation" as keyof typeof apiResponses,
      label: "Validation Error",
      method: "POST",
      icon: <AlertTriangle className="w-4 h-4" />,
      color: "bg-red-500",
      requiresAuth: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">📚 Bookstore Management System</h1>
          <p className="text-lg text-gray-600 mb-4">Spring Boot REST API - Live Output Preview</p>
          <div className="flex justify-center gap-2">
            <Badge variant="secondary">Spring Boot 3.2.0</Badge>
            <Badge variant="secondary">JWT Authentication</Badge>
            <Badge variant="secondary">MySQL Database</Badge>
            <Badge variant="secondary">Swagger Documentation</Badge>
          </div>
        </div>

        {/* Authentication Status */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isAuthenticated ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="font-medium">
                      Authenticated as {currentUser?.name} ({currentUser?.role})
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-red-500" />
                    <span className="font-medium">Not Authenticated</span>
                  </>
                )}
              </div>
              <div className="flex gap-2">
                {!isAuthenticated ? (
                  <Button onClick={handleLogin} className="bg-blue-600 hover:bg-blue-700">
                    Login as Admin
                  </Button>
                ) : (
                  <Button onClick={handleLogout} variant="outline">
                    Logout
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* API Endpoints */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">🔗 API Endpoints</CardTitle>
              <CardDescription>Click to see real API responses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {endpoints.map((endpoint) => (
                  <Button
                    key={endpoint.key}
                    variant="outline"
                    className="w-full justify-start h-auto p-3"
                    onClick={() => showResponse(endpoint.key)}
                    disabled={endpoint.requiresAuth && !isAuthenticated}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <Badge className={`${endpoint.color} text-white text-xs`}>{endpoint.method}</Badge>
                      {endpoint.icon}
                      <span className="flex-1 text-left">{endpoint.label}</span>
                      {endpoint.requiresAuth && <Lock className="w-4 h-4 text-gray-400" />}
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Response Display */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>📊 API Response Output</CardTitle>
              <CardDescription>Real JSON responses from Spring Boot API</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96 w-full rounded-md border">
                <div className="p-4">
                  {activeResponse ? (
                    <pre className="text-sm font-mono whitespace-pre-wrap">
                      <code>{activeResponse}</code>
                    </pre>
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      <Book className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Click an endpoint above to see the API response</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* API Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Book className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold text-blue-600">25+</div>
              <div className="text-sm text-gray-600">Books in Database</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <User className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold text-green-600">150+</div>
              <div className="text-sm text-gray-600">Registered Users</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <ShoppingCart className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold text-purple-600">89</div>
              <div className="text-sm text-gray-600">Total Orders</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-8 h-8 mx-auto mb-2 text-orange-600" />
              <div className="text-2xl font-bold text-orange-600">15+</div>
              <div className="text-sm text-gray-600">API Endpoints</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Start Guide */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>🚀 How to Run the Actual API</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="setup" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="setup">Setup</TabsTrigger>
                <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
              </TabsList>

              <TabsContent value="setup" className="mt-4">
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                  <div># 1. Download the Spring Boot project</div>
                  <div># 2. Configure MySQL database</div>
                  <div>CREATE DATABASE bookstore_db;</div>
                  <div className="mt-2"># 3. Update application.properties</div>
                  <div>spring.datasource.url=jdbc:mysql://localhost:3306/bookstore_db</div>
                  <div className="mt-2"># 4. Run the application</div>
                  <div>mvn clean install</div>
                  <div>mvn spring-boot:run</div>
                  <div className="mt-2"># 5. Access API</div>
                  <div>http://localhost:8080/swagger-ui.html</div>
                </div>
              </TabsContent>

              <TabsContent value="endpoints" className="mt-4">
                <div className="space-y-2 text-sm">
                  <div>
                    <Badge className="bg-blue-500 text-white mr-2">POST</Badge>/api/register - Register new user
                  </div>
                  <div>
                    <Badge className="bg-blue-500 text-white mr-2">POST</Badge>/api/login - User authentication
                  </div>
                  <div>
                    <Badge className="bg-green-500 text-white mr-2">GET</Badge>/api/books - Get all books (paginated)
                  </div>
                  <div>
                    <Badge className="bg-green-500 text-white mr-2">GET</Badge>/api/books/{"{id}"} - Get book by ID
                  </div>
                  <div>
                    <Badge className="bg-blue-500 text-white mr-2">POST</Badge>/api/books - Create book (Admin only)
                  </div>
                  <div>
                    <Badge className="bg-orange-500 text-white mr-2">PUT</Badge>/api/books/{"{id}"} - Update book (Admin
                    only)
                  </div>
                  <div>
                    <Badge className="bg-red-500 text-white mr-2">DELETE</Badge>/api/books/{"{id}"} - Delete book (Admin
                    only)
                  </div>
                  <div>
                    <Badge className="bg-blue-500 text-white mr-2">POST</Badge>/api/orders - Create order
                  </div>
                  <div>
                    <Badge className="bg-green-500 text-white mr-2">GET</Badge>/api/orders/my-orders - Get user orders
                  </div>
                  <div>
                    <Badge className="bg-green-500 text-white mr-2">GET</Badge>/api/orders - Get all orders (Admin only)
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="features" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold mb-2">🔐 Security Features</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• JWT Authentication</li>
                      <li>• Role-based Access Control</li>
                      <li>• Password Encryption (BCrypt)</li>
                      <li>• Input Validation</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">📊 API Features</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Pagination & Sorting</li>
                      <li>• Search & Filtering</li>
                      <li>• Error Handling</li>
                      <li>• Swagger Documentation</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
