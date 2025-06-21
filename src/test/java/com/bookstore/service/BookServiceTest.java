package com.bookstore.service;

import com.bookstore.dto.BookDto;
import com.bookstore.exception.ResourceNotFoundException;
import com.bookstore.model.Book;
import com.bookstore.repository.BookRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class BookServiceTest {

    @Mock
    private BookRepository bookRepository;

    @InjectMocks
    private BookService bookService;

    private Book testBook;
    private BookDto testBookDto;

    @BeforeEach
    void setUp() {
        testBook = new Book();
        testBook.setId(1L);
        testBook.setTitle("Test Book");
        testBook.setAuthor("Test Author");
        testBook.setGenre("Fiction");
        testBook.setIsbn("123456789");
        testBook.setPrice(BigDecimal.valueOf(19.99));
        testBook.setStockQuantity(10);

        testBookDto = new BookDto();
        testBookDto.setTitle("Test Book");
        testBookDto.setAuthor("Test Author");
        testBookDto.setGenre("Fiction");
        testBookDto.setIsbn("123456789");
        testBookDto.setPrice(BigDecimal.valueOf(19.99));
        testBookDto.setStockQuantity(10);
    }

    @Test
    void testGetBookById_Success() {
        when(bookRepository.findById(1L)).thenReturn(Optional.of(testBook));

        Book result = bookService.getBookById(1L);

        assertNotNull(result);
        assertEquals(testBook.getId(), result.getId());
        assertEquals(testBook.getTitle(), result.getTitle());
        verify(bookRepository, times(1)).findById(1L);
    }

    @Test
    void testGetBookById_NotFound() {
        when(bookRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> bookService.getBookById(1L));
        verify(bookRepository, times(1)).findById(1L);
    }

    @Test
    void testCreateBook_Success() {
        when(bookRepository.save(any(Book.class))).thenReturn(testBook);

        Book result = bookService.createBook(testBookDto);

        assertNotNull(result);
        assertEquals(testBook.getTitle(), result.getTitle());
        assertEquals(testBook.getAuthor(), result.getAuthor());
        verify(bookRepository, times(1)).save(any(Book.class));
    }

    @Test
    void testUpdateStock_Success() {
        when(bookRepository.findById(1L)).thenReturn(Optional.of(testBook));
        when(bookRepository.save(any(Book.class))).thenReturn(testBook);

        bookService.updateStock(1L, 5);

        assertEquals(5, testBook.getStockQuantity());
        verify(bookRepository, times(1)).findById(1L);
        verify(bookRepository, times(1)).save(testBook);
    }

    @Test
    void testUpdateStock_InsufficientStock() {
        when(bookRepository.findById(1L)).thenReturn(Optional.of(testBook));

        assertThrows(IllegalArgumentException.class, () -> bookService.updateStock(1L, 15));
        verify(bookRepository, times(1)).findById(1L);
        verify(bookRepository, never()).save(any(Book.class));
    }
}
