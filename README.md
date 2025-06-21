# Bookstore Management System - REST API

A comprehensive REST API for managing a bookstore built with Java Spring Boot. This system provides functionality for book management, user authentication, and order processing.

## Features

- **Book Management**: CRUD operations for books with search and pagination
- **User Authentication**: JWT-based authentication with role-based access control
- **Order Management**: Complete order processing system
- **Security**: Spring Security with JWT tokens
- **API Documentation**: Swagger/OpenAPI documentation
- **Database Integration**: MySQL database with JPA/Hibernate
- **Error Handling**: Comprehensive error handling with meaningful messages
- **Testing**: Unit tests for services and controllers

## Technologies Used

- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Security**
- **Spring Data JPA**
- **MySQL**
- **JWT (JSON Web Tokens)**
- **Swagger/OpenAPI 3**
- **Maven**
- **JUnit 5**
- **Lombok**

## Getting Started

### Prerequisites

- Java 17 or higher
- Maven 3.6+
- MySQL 8.0+

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd bookstore-management-system
   \`\`\`

2. **Set up MySQL Database**
   \`\`\`sql
   CREATE DATABASE bookstore_db;
   \`\`\`

3. **Configure Database Connection**
   Update `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/bookstore_db
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   \`\`\`

4. **Run Database Setup Script**
   Execute the SQL script in `scripts/database-setup.sql` to create tables and insert sample data.

5. **Build and Run the Application**
   \`\`\`bash
   mvn clean install
   mvn spring-boot:run
   \`\`\`

The application will start on `http://localhost:8080`

## API Documentation

Once the application is running, you can access the Swagger UI at:
- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **API Docs**: http://localhost:8080/v3/api-docs

## API Endpoints

### Authentication
- `POST /api/register` - Register a new user
- `POST /api/login` - Login and get JWT token

### Books
- `GET /api/books` - Get all books (with pagination and search)
- `GET /api/books/{id}` - Get book by ID
- `POST /api/books` - Create new book (Admin only)
- `PUT /api/books/{id}` - Update book (Admin only)
- `DELETE /api/books/{id}` - Delete book (Admin only)

### Orders
- `GET /api/orders` - Get all orders (Admin only)
- `GET /api/orders/my-orders` - Get current user's orders
- `GET /api/orders/{id}` - Get order by ID
- `POST /api/orders` - Create new order
- `PUT /api/orders/{id}/status` - Update order status (Admin only)

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. To access protected endpoints:

1. Register a new user or login with existing credentials
2. Include the JWT token in the Authorization header:
   \`\`\`
   Authorization: Bearer <your-jwt-token>
   \`\`\`

### Default Admin User
- **Email**: admin@bookstore.com
- **Password**: admin123

## Sample API Usage

### Register a New User
\`\`\`bash
curl -X POST http://localhost:8080/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "CUSTOMER"
  }'
\`\`\`

### Login
\`\`\`bash
curl -X POST http://localhost:8080/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
\`\`\`

### Get All Books
\`\`\`bash
curl -X GET "http://localhost:8080/api/books?page=0&size=10&search=gatsby"
\`\`\`

### Create an Order
\`\`\`bash
curl -X POST http://localhost:8080/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-jwt-token>" \
  -d '{
    "orderItems": [
      {
        "bookId": 1,
        "quantity": 2
      }
    ]
  }'
\`\`\`

## Testing

Run the tests using Maven:
\`\`\`bash
mvn test
\`\`\`

## Project Structure

\`\`\`
src/
├── main/
│   ├── java/com/bookstore/
│   │   ├── config/          # Configuration classes
│   │   ├── controller/      # REST controllers
│   │   ├── dto/            # Data Transfer Objects
│   │   ├── exception/      # Exception handling
│   │   ├── model/          # Entity classes
│   │   ├── repository/     # Data repositories
│   │   ├── security/       # Security configuration
│   │   └── service/        # Business logic
│   └── resources/
│       └── application.properties
├── test/                   # Unit tests
└── scripts/               # Database scripts
\`\`\`

## Error Handling

The API provides comprehensive error handling with appropriate HTTP status codes:

- `200 OK` - Successful requests
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Access denied
- `404 Not Found` - Resource not found
- `409 Conflict` - Resource already exists
- `500 Internal Server Error` - Server error

## Security Features

- Password encryption using BCrypt
- JWT-based authentication
- Role-based access control (CUSTOMER/ADMIN)
- Protected endpoints based on user roles
- Input validation and sanitization

## Future Enhancements

- Payment gateway integration
- Book reviews and ratings
- Email notifications
- Admin dashboard
- Book recommendations
- Inventory alerts
- Order tracking

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
