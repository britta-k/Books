import { useState, useEffect, useMemo, useCallback} from 'react';
const APIURL = 'https://api.nytimes.com/svc/books/v3/lists/current/paperback-nonfiction.json?api-key=Tdg0jGGpcZn1ydjogoOAZgQ7u4s8yb81';

export const Nonfiction = () => {
  const [books, setBooks] = useState([]);
  const [expandedBook, setExpandedBook] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(APIURL);
      const data = await response.json();
      setBooks(data.results.books);
    };
    fetchData();
  }, []);

  const toggleExpandedBook = useCallback((isbn) => {
    setExpandedBook(isbn === expandedBook ? null : isbn);
  }, [expandedBook]);

  const booksWithPositionChanges = useMemo(() => {
    return books.map((book, index) => {
      let positionChange;
      let rankChangeClass = ''; // Initializes CSS class
      if (book.rank_last_week === 0) {
        positionChange = 'New on the list';
        rankChangeClass = 'green';
      } else {
        const change = book.rank_last_week - book.rank;
        positionChange = change > 0 ? `Increased by ${change}` : change < 0 ? `Decreased by ${Math.abs(change)}` : 'No change';
        if (change > 0 || book.rank_last_week === 0) {
          rankChangeClass = 'green'; // Applies another color if ranking increased
        }
      }
      return {
        ...book,
        positionChange,
        rankChangeClass, // Adds CSS class to book object
        rank: `#${index + 1}` // Adds rank number
      };
    });
  }, [books]);

  return (
    <div className='books-container'>
      <div className='home-banner'>
        <h1>Current Bestselling Nonfiction Books</h1>
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