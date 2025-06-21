// Mock data and state
let isAuthenticated = false
let currentUser = null
let authToken = null

// Sample data
const sampleBooks = [
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
    createdAt: "2024-01-15T10:30:00",
    updatedAt: "2024-01-15T10:30:00",
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
    createdAt: "2024-01-15T10:30:00",
    updatedAt: "2024-01-15T10:30:00",
  },
]

const sampleOrders = [
  {
    id: 1,
    userId: 2,
    userName: "John Doe",
    userEmail: "john@example.com",
    orderItems: [
      {
        bookId: 1,
        bookTitle: "The Great Gatsby",
        bookAuthor: "F. Scott Fitzgerald",
        quantity: 2,
        price: 12.99,
      },
    ],
    totalAmount: 25.98,
    status: "PENDING",
    paymentStatus: "PENDING",
    createdAt: "2024-01-20T14:30:00",
    updatedAt: "2024-01-20T14:30:00",
  },
]

// Utility functions
function showResponse(elementId, data, status = 200) {
  const element = document.getElementById(elementId)
  const response = {
    status: status,
    timestamp: new Date().toISOString(),
    data: data,
  }

  element.innerHTML = `<pre>${JSON.stringify(response, null, 2)}</pre>`
  element.classList.add("show")

  // Scroll to response
  element.scrollIntoView({ behavior: "smooth", block: "nearest" })
}

function showError(elementId, message, status = 400) {
  const element = document.getElementById(elementId)
  const error = {
    status: status,
    timestamp: new Date().toISOString(),
    error: getErrorType(status),
    message: message,
  }

  element.innerHTML = `<pre>${JSON.stringify(error, null, 2)}</pre>`
  element.classList.add("show")
  element.scrollIntoView({ behavior: "smooth", block: "nearest" })
}

function getErrorType(status) {
  switch (status) {
    case 400:
      return "Bad Request"
    case 401:
      return "Unauthorized"
    case 403:
      return "Forbidden"
    case 404:
      return "Not Found"
    case 409:
      return "Conflict"
    case 500:
      return "Internal Server Error"
    default:
      return "Error"
  }
}

function updateAuthStatus() {
  const statusElement = document.getElementById("authStatus")
  const loginBtn = document.getElementById("loginBtn")
  const logoutBtn = document.getElementById("logoutBtn")
  const indicator = statusElement.querySelector(".status-indicator")

  if (isAuthenticated) {
    statusElement.innerHTML = `
            <span class="status-indicator online"></span>
            Authenticated as ${currentUser.name} (${currentUser.role})
        `
    loginBtn.style.display = "none"
    logoutBtn.style.display = "inline-block"
  } else {
    statusElement.innerHTML = `
            <span class="status-indicator offline"></span>
            Not Authenticated
        `
    loginBtn.style.display = "inline-block"
    logoutBtn.style.display = "none"
  }
}

// Authentication functions
function testRegister() {
  const userData = {
    message: "User registered successfully",
    userId: 3,
    email: "newuser@example.com",
    role: "CUSTOMER",
  }

  showResponse("registerResponse", userData, 201)
}

function testLogin() {
  const loginData = {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbkBib29rc3RvcmUuY29tIiwiaWF0IjoxNjQwOTk1MjAwLCJleHAiOjE2NDA5OTg4MDB9.example",
    type: "Bearer",
    userId: 1,
    email: "admin@bookstore.com",
    name: "Admin User",
    role: "ADMIN",
  }

  // Update auth state
  isAuthenticated = true
  currentUser = {
    id: 1,
    name: "Admin User",
    email: "admin@bookstore.com",
    role: "ADMIN",
  }
  authToken = loginData.token
  updateAuthStatus()

  showResponse("loginResponse", loginData)
}

// Book functions
function testGetBooks() {
  const booksResponse = {
    content: sampleBooks,
    pageable: {
      sort: {
        sorted: false,
        unsorted: true,
      },
      pageNumber: 0,
      pageSize: 10,
      offset: 0,
      paged: true,
      unpaged: false,
    },
    totalElements: 25,
    totalPages: 3,
    last: false,
    first: true,
    numberOfElements: 10,
    size: 10,
    number: 0,
    sort: {
      sorted: false,
      unsorted: true,
    },
  }

  showResponse("getBooksResponse", booksResponse)
}

function testGetBook() {
  showResponse("getBookResponse", sampleBooks[0])
}

function testCreateBook() {
  if (!isAuthenticated) {
    showError("createBookResponse", "Access denied. Authentication required.", 401)
    return
  }

  if (currentUser.role !== "ADMIN") {
    showError("createBookResponse", "Access denied. Admin role required.", 403)
    return
  }

  const newBook = {
    id: 26,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    isbn: "978-0-547-92822-7",
    price: 16.99,
    description: "A fantasy adventure novel about a hobbit's unexpected journey.",
    stockQuantity: 25,
    imageUrl: "https://example.com/hobbit.jpg",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  showResponse("createBookResponse", newBook, 201)
}

function testSearchBooks() {
  const searchResults = {
    content: [sampleBooks[0]], // Only Gatsby matches
    pageable: {
      sort: {
        sorted: false,
        unsorted: true,
      },
      pageNumber: 0,
      pageSize: 10,
      offset: 0,
      paged: true,
      unpaged: false,
    },
    totalElements: 1,
    totalPages: 1,
    last: true,
    first: true,
    numberOfElements: 1,
    size: 10,
    number: 0,
    sort: {
      sorted: false,
      unsorted: true,
    },
  }

  showResponse("searchBooksResponse", searchResults)
}

// Order functions
function testCreateOrder() {
  if (!isAuthenticated) {
    showError("createOrderResponse", "Access denied. Authentication required.", 401)
    return
  }

  const newOrder = {
    id: 15,
    userId: currentUser.id,
    userName: currentUser.name,
    userEmail: currentUser.email,
    orderItems: [
      {
        bookId: 1,
        bookTitle: "The Great Gatsby",
        bookAuthor: "F. Scott Fitzgerald",
        quantity: 2,
        price: 12.99,
      },
      {
        bookId: 2,
        bookTitle: "To Kill a Mockingbird",
        bookAuthor: "Harper Lee",
        quantity: 1,
        price: 14.99,
      },
    ],
    totalAmount: 40.97,
    status: "PENDING",
    paymentStatus: "PENDING",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  showResponse("createOrderResponse", newOrder, 201)
}

function testGetMyOrders() {
  if (!isAuthenticated) {
    showError("getMyOrdersResponse", "Access denied. Authentication required.", 401)
    return
  }

  const myOrdersResponse = {
    content: sampleOrders,
    pageable: {
      sort: {
        sorted: true,
        unsorted: false,
      },
      pageNumber: 0,
      pageSize: 10,
      offset: 0,
      paged: true,
      unpaged: false,
    },
    totalElements: 5,
    totalPages: 1,
    last: true,
    first: true,
    numberOfElements: 5,
    size: 10,
    number: 0,
    sort: {
      sorted: true,
      unsorted: false,
    },
  }

  showResponse("getMyOrdersResponse", myOrdersResponse)
}

function testGetAllOrders() {
  if (!isAuthenticated) {
    showError("getAllOrdersResponse", "Access denied. Authentication required.", 401)
    return
  }

  if (currentUser.role !== "ADMIN") {
    showError("getAllOrdersResponse", "Access denied. Admin role required.", 403)
    return
  }

  const allOrdersResponse = {
    content: [
      ...sampleOrders,
      {
        id: 2,
        userId: 3,
        userName: "Jane Smith",
        userEmail: "jane@example.com",
        orderItems: [
          {
            bookId: 3,
            bookTitle: "1984",
            bookAuthor: "George Orwell",
            quantity: 1,
            price: 13.99,
          },
        ],
        totalAmount: 13.99,
        status: "CONFIRMED",
        paymentStatus: "PAID",
        createdAt: "2024-01-19T09:15:00",
        updatedAt: "2024-01-19T10:30:00",
      },
    ],
    pageable: {
      sort: {
        sorted: true,
        unsorted: false,
      },
      pageNumber: 0,
      pageSize: 10,
      offset: 0,
      paged: true,
      unpaged: false,
    },
    totalElements: 89,
    totalPages: 9,
    last: false,
    first: true,
    numberOfElements: 10,
    size: 10,
    number: 0,
    sort: {
      sorted: true,
      unsorted: false,
    },
  }

  showResponse("getAllOrdersResponse", allOrdersResponse)
}

function testUpdateOrderStatus() {
  if (!isAuthenticated) {
    showError("updateOrderStatusResponse", "Access denied. Authentication required.", 401)
    return
  }

  if (currentUser.role !== "ADMIN") {
    showError("updateOrderStatusResponse", "Access denied. Admin role required.", 403)
    return
  }

  const updateResponse = {
    message: "Order status updated successfully",
    orderId: 1,
    status: "CONFIRMED",
  }

  showResponse("updateOrderStatusResponse", updateResponse)
}

// Error handling functions
function testNotFound() {
  showError("notFoundResponse", "Book not found with id: 999", 404)
}

function testUnauthorized() {
  showError("unauthorizedResponse", "Access denied. Authentication required.", 401)
}

function testValidationError() {
  const validationError = {
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
  }

  showResponse("validationErrorResponse", validationError, 400)
}

// Event listeners
document.getElementById("loginBtn").addEventListener("click", testLogin)
document.getElementById("logoutBtn").addEventListener("click", () => {
  isAuthenticated = false
  currentUser = null
  authToken = null
  updateAuthStatus()
})

// Initialize
updateAuthStatus()

// Add some animation effects
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".api-section")
  sections.forEach((section, index) => {
    section.style.opacity = "0"
    section.style.transform = "translateY(20px)"
    setTimeout(() => {
      section.style.transition = "all 0.5s ease"
      section.style.opacity = "1"
      section.style.transform = "translateY(0)"
    }, index * 200)
  })
})
