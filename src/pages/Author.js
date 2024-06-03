import { useState } from 'react';

export const Author = () => {
  const [bookTitle, setBookTitle] = useState(''); // State hook to manage the book title input field value, initialized as an empty string

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior to handle it manually
    console.log('Book submitted:', { title: bookTitle }); // Logs the submitted book title to the console
    setBookTitle(''); // Clears the input field by resetting the state
  };

  return (
    <div class="author-container">
      <h3>Welcome to the author's page.</h3>
      <p>Submit a recommendation to boost your book on the bestsellers list:</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={bookTitle}
          onChange={(e) => setBookTitle(e.target.value)}
          placeholder="Book Title"
          required
        />
        <button type="submit">Submit Book</button>
      </form>
    </div>
  );
};