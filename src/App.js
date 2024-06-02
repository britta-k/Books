import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {Home, Fiction, Nonfiction, NotFound, Author} from './pages';
import {Header} from './components';
import { Footer } from './components/Footer';
import './App.css';

function App() {
  const isAuthor = true;
  return (
    <BrowserRouter>
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="*" element={<NotFound/>}></Route>
        <Route path="/fiction" element={<Fiction/>}></Route>
        <Route path="/nonfiction" element={<Nonfiction/>}></Route>
        <Route path="/author" element={isAuthor? <Author/> : <Navigate to="/"></Navigate>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
    </BrowserRouter>
  );
}

export default App;