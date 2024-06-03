import { useState, useEffect, useMemo, useCallback } from 'react';

const APIURL = 'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=Tdg0jGGpcZn1ydjogoOAZgQ7u4s8yb81';

export const Fiction = () => {
  const [books, setBooks] = useState([]); // State hook to hold the list of books fetched from the API
  const [expandedBook, setExpandedBook] = useState(null);  // State hook to track which book's details are currently expanded

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(APIURL); // Fetch data from the API
      const data = await response.json();
      setBooks(data.results.books); // Updates the state with the fetched book data
    };
    fetchData();
  }, []); // Empty array ensures the effect runs only once after the initial render

  const toggleExpandedBook = useCallback((isbn) => {
    setExpandedBook(isbn === expandedBook ? null : isbn); // Toggle the expanded book state: collapse if already expanded, expand otherwise
  }, [expandedBook]);

  // useCallback ensures that the toggleExpandedBook function is memorized and not recreated on every render unless the expandedBook state changes

  const booksWithPositionChanges = useMemo(() => {
    return books.map((book, index) => {
      let positionChange;
      let rankChangeClass = ''; // Initializes CSS class
      if (book.rank_last_week === 0) {
        positionChange = 'New on the list';
        rankChangeClass = 'trending';
      } else {
        const change = book.rank_last_week - book.rank; // Calculates the change in rank from the previous week
        positionChange = change > 0 ? `Increased by ${change}` : change < 0 ? `Decreased by ${Math.abs(change)}` : 'No change'; // Determines the position change description based on rank change
        if (change > 0 || book.rank_last_week === 0) {
          rankChangeClass = 'trending'; //Applies a CSS class if the rank has improved or the book is new
        }
      }
      return {
        ...book,
        positionChange, // Adds position change information to the book object
        rankChangeClass, // Adds CSS class for rank change to the book object
        rank: `#${index + 1}` // Formats the rank for display
      };
    });
  }, [books]);

  // useMemo ensures that the booksWithPositionChanges calculation is memorized and not recomputed on every render unless the books array changes

  return (
    <div className='books-container'>
      <div className='home-banner'>
        <h1>Current Bestselling Fiction Books</h1>
      </div>
      <ol>
        {booksWithPositionChanges.map(book => (
          <li key={book.primary_isbn10} className="book-item">
            <div onClick={() => toggleExpandedBook(book.primary_isbn10)} className='book-info'>
              <img src={book.book_image} alt={book.title} className="book-image" />
              <div className="book-icon">{book.rank}</div>
              <div className="book-details">
                <div className="book-title">
                  <strong>{book.title}</strong> by {book.author}
                </div>
                {book.positionChange && <span className={book.rankChangeClass}> {book.positionChange}</span>}
              </div>
            </div>
            {expandedBook === book.primary_isbn10 && (
              <div className="expanded-info">
                <p>Rank: {book.rank}</p>
                <p>Rank last week: #{book.rank_last_week}</p>
                <p>Publisher: {book.publisher}</p>
                <p>Description: {book.description}</p>
                <div id='buy-span'>
                  <a href={book.amazon_product_url} target="_blank" rel="noopener noreferrer" id="buy">Buy this book</a>
                </div>
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};


 