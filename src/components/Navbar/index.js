import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <nav className="nav-extended">
    <header className="App-header">
    <h4 className="section">My Reads</h4>
    <div className="section nav-content">
    <ul className="tabs tabs-transparent">
      <li className="tab"><NavLink exact to="/" >My Books</NavLink ></li>
      <li className="tab"><NavLink exact to="/books">Add Book</NavLink ></li>
    </ul>
  </div>
  </header>
 </nav>
)

export default Navbar;
