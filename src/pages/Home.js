import { NavLink } from 'react-router-dom';
import Hemingway from '../assets/hemingway.jpg';
import King from '../assets/king.jpg';
import Kolk from '../assets/kolk.jpg';
import Books from '../assets/books.png';

// Book component to render individual book details
const Book = ({ image, category, title, author, buttonText, buttonLink }) => {
  return (
    <div className="book-category">
      <img src={image} alt={category} className="bookCover" />
      <div className="book-details">
        <h3>#1 Bestseller</h3>
        <h4>{title}</h4>
        <p>{author}</p>
        <NavLink to={buttonLink} className='button'>{buttonText}</NavLink>
      </div>
    </div>
  );
};

export const Home = () => {
  return (
    <div className="home-container">
      <header className="home-banner">
        <div className="banner-content">
          <h1>Welcome to Bestselling Books</h1>
          <p>Discover the latest and greatest in fiction and non-fiction books.</p>
        </div>
      </header>
      <section className="home-section">
        <h2>This Week's Bestsellers Ranked</h2>
        <div className="book-categories">
          <Book
            image={King}
            category="Fiction"
            title="You Like It Darker"
            author="Stephen King"
            buttonText="Discover Fiction"
            buttonLink="/fiction"
          />
          <Book
            image={Kolk}
            category="Nonfiction"
            title="The Body Keeps the Score"
            author="Bessel van der Kolk"
            buttonText="Discover Nonfiction"
            buttonLink="/nonfiction"
          />
        </div>
      </section>
      <section className="home-section read-next">
        <h2>What to read next?</h2>
        <img src= {Books} alt="Books" className="books-image" />
        <p>
          Our carefully curated lists of bestselling books are meticulously updated each week, bringing you the freshest trends and top titles in both fiction and nonfiction genres. Dive into our weekly rankings to stay ahead of the curve and discover the most talked-about books that are capturing readers' imaginations across the globe. Whether you're seeking a thrilling novel, a thought-provoking biography, or the latest self-help guide, our dynamic lists ensure you never miss a must-read. Follow the shifts in ranking as new literary sensations emerge and established favorites hold their ground. Explore, read, and stay connected to the world of books with our up-to-date and comprehensive selections, designed to help you find your next great read.
        </p>
      </section>
      <section className="home-section author-quote">
        <img src= {Hemingway} alt="Author" className="author-image" />
        <blockquote>
          "There is no friend as loyal as a book." - Ernest Hemingway
        </blockquote>
      </section>
    </div>
  );
};