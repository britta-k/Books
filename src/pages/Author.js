import { useState } from 'react';

export const Author = () => {
  const [bookTitle, setBookTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Book submitted:', { title: bookTitle });
    setBookTitle(''); // Clears the form field
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