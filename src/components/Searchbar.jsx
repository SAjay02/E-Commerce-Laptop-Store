import React, { useState, useEffect } from 'react';
import {Button,Form,NavDropdown} from "react-bootstrap"
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import "./Searchbar.css"
const Searchbar = ({setSelectedProduct}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const navigate=useNavigate();
    useEffect(() => {
        const fetchSuggestions = async () => {
          try {
            const response = await fetch(`https://e-com-back.onrender.com/api/products?q=${searchQuery}`);
            const data = await response.json();
            // console.log(data)
            setSuggestions(data || []); // Ensure suggestions is always an array
          } catch (error) {
            console.error('Error fetching suggestions:', error);
          }
        };
    
        if (searchQuery.trim() !== '') {
          fetchSuggestions();
        } else {
          setSuggestions([]);
        }
      }, [searchQuery]);
      const filteredSuggestions = suggestions.filter((suggestion) =>
  suggestion.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const calculateFontWeight = (index) => {
    // Set a higher font weight for characters after the first one
    return index === 0 ? 'normal' : 'bold';
  };


  // Inside the SearchBar component
const handleSuggestionClick = (suggestion) => {
    setSelectedProduct(suggestion);
    setSearchQuery(suggestion.name)
    navigate(`/api/products/${suggestion._id}`);
    setSearchQuery('')
  };
  
const handleMove= ()=>
{
   navigate('/all_products');
}
  return (
    <div>
        <Navbar.Collapse id="basic-navbar-nav search_cont">
          <Nav className=" justify-content-between search_cont" >
          <Form className="d-flex my-1  position-relative d-inline-block">
            <Form.Control
              type="search"
              placeholder="Search.."
              className=" nav-items-clr "
              aria-label="Search"
              style={{border:" solid #0978e3",fontFamily: "Amazon Ember,Arial,sans-serif"}}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <i class="fa-solid fa-magnifying-glass fa-lg search_icon"></i>
            </Form> 
          </Nav>
          <Nav>
            <NavDropdown title="All Categories" id="collapsible-nav-dropdown" className="nav-items-clr border-2" style={{backgroundColor:"white",borderRadius:"7px",border:"1px solid #0978e3"}}>
              <NavDropdown.Item  className='common_under' onClick={handleMove}>Gaming</NavDropdown.Item>
              <NavDropdown.Item  className='common_under' onClick={handleMove}>Business</NavDropdown.Item>
              <NavDropdown.Item  className='common_under' onClick={handleMove}>Education</NavDropdown.Item>
            </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        {filteredSuggestions.length > 0 && searchQuery.trim() !== '' && (
   <div className="dropdown drop_cont">
    <ul className="dropdown-menu show">
      {filteredSuggestions.map((suggestion) => (
        <li key={suggestion.id}>
          <button
            className="dropdown-item"
            type="button"
            onClick={() => handleSuggestionClick(suggestion)}
          >
            {suggestion.name.split('').map((char, index) => (
              <span
                key={index}
                style={{ fontWeight: index < searchQuery.length ? 'normal' : 'bold' }}
              >
                {char}
              </span>
            ))}
          </button>
        </li>
      ))}
    </ul>
  </div>
)}
    </div>
  )
}

export default Searchbar