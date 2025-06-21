package com.bookstore.service;

import com.bookstore.dto.BookDto;
import com.bookstore.exception.ResourceNotFoundException;
import com.bookstore.model.Book;
import com.bookstore.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class BookService {
    
    private final BookRepository bookRepository;
    
    public Page<Book> getAllBooks(Pageable pageable) {
        return bookRepository.findAll(pageable);
    }
    
    public Book getBookById(Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with id: " + id));
    }
    
    public Page<Book> searchBooks(String search, Pageable pageable) {
        if (search == null || search.trim().isEmpty()) {
            return bookRepository.findAll(pageable);
        }
        return bookRepository.findByTitleOrAuthorContainingIgnoreCase(search.trim(), pageable);
    }
    
    public Page<Book> getBooksByGenre(String genre, Pageable pageable) {
        return bookRepository.findByGenreIgnoreCase(genre, pageable);
    }
    
    public Book createBook(BookDto bookDto) {
        Book book = new Book();
        mapDtoToEntity(bookDto, book);
        return bookRepository.save(book);
    }
    
    public Book updateBook(Long id, BookDto bookDto) {
        Book book = getBookById(id);
        mapDtoToEntity(bookDto, book);
        return bookRepository.save(book);
    }
    
    public void deleteBook(Long id) {
        Book book = getBookById(id);
        bookRepository.delete(book);
    }
    
    public void updateStock(Long bookId, Integer quantity) {
        Book book = getBookById(bookId);
        if (book.getStockQuantity() < quantity) {
            throw new IllegalArgumentException("Insufficient stock available");
        }
        book.setStockQuantity(book.getStockQuantity() - quantity);
        bookRepository.save(book);
    }
    
    private void mapDtoToEntity(BookDto dto, Book entity) {
        entity.setTitle(dto.getTitle());
        entity.setAuthor(dto.getAuthor());
        entity.setGenre(dto.getGenre());
        entity.setIsbn(dto.getIsbn());
        entity.setPrice(dto.getPrice());
        entity.setDescription(dto.getDescription());
        entity.setStockQuantity(dto.getStockQuantity());
        entity.setImageUrl(dto.getImageUrl());
    }
}
