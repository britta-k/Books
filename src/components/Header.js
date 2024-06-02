import {NavLink} from 'react-router-dom';
import Logo from '../assets/logo.png';
export const Header = () => {
  return (
    <header>
      <a href = "/" className="logo">
        <img src = {Logo} alt='logo'></img>
      </a>
      <nav className = 'navigation'>
        <NavLink to = "/" className = 'link'>Home</NavLink>
        <NavLink to = "/fiction" className = 'link'>Fiction</NavLink>
        <NavLink to = "/nonfiction" className = 'link'>Nonfiction</NavLink>
      </nav>
    </header>
  )
}