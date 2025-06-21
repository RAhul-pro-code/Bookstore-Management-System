package com.bookstore.controller;

import com.bookstore.dto.BookDto;
import com.bookstore.model.Book;
import com.bookstore.service.BookService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
@Tag(name = "Book Management", description = "APIs for managing books")
public class BookController {
    
    private final BookService bookService;
    
    @GetMapping
    @Operation(summary = "Get all books", description = "Retrieve a paginated list of all books")
    public ResponseEntity<Page<Book>> getAllBooks(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String genre) {
        
        Sort sort = sortDir.equalsIgnoreCase("desc") ? 
            Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<Book> books;
        if (search != null && !search.trim().isEmpty()) {
            books = bookService.searchBooks(search, pageable);
        } else if (genre != null && !genre.trim().isEmpty()) {
            books = bookService.getBooksByGenre(genre, pageable);
        } else {
            books = bookService.getAllBooks(pageable);
        }
        
        return ResponseEntity.ok(books);
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get book by ID", description = "Retrieve a single book by its ID")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        Book book = bookService.getBookById(id);
        return ResponseEntity.ok(book);
    }
    
    @PostMapping
    @Operation(summary = "Create a new book", description = "Add a new book to the inventory (Admin only)",
               security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Book> createBook(@Valid @RequestBody BookDto bookDto) {
        Book book = bookService.createBook(bookDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(book);
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Update a book", description = "Update an existing book's details (Admin only)",
               security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @Valid @RequestBody BookDto bookDto) {
        Book book = bookService.updateBook(id, bookDto);
        return ResponseEntity.ok(book);
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a book", description = "Delete a book from the inventory (Admin only)",
               security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }
}
