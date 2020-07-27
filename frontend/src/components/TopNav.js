import React, { useState, useContext } from 'react';
import { Button, Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../user-context';

const TopNav = () => {
  const {isLoggedIn, setIsLoggedIn} = useContext(UserContext)
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);
  const logoutHandler = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('user_id');
    setIsLoggedIn(false)
  }

  return isLoggedIn ? 
    <div>
        {console.log(isLoggedIn)}
      <Navbar color='light' light>
        <NavbarToggler onClick={toggleNavbar}/>
        <Link to='/login' onClick={logoutHandler}><Button color='success'>Logout</Button></Link>
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
                <Link to='/events'>Events</Link>
            </NavItem>
            <NavItem>
                <Link to='/'>Dashboard</Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  : "";
}

export default TopNav;