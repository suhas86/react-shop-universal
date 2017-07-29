"use strict"
import React,{Component} from 'react';
import {Nav,Navbar,NavItem,Badge} from 'react-bootstrap';
import { Link } from "react-router-dom";

class Menu extends Component {
    render(){
        return (
             <Navbar inverse fixedTop>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/">Mean Shop</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={1} href="/about">About</NavItem>
        <NavItem eventKey={2} href="/contact">Contact Us</NavItem>
      </Nav>
      <Nav pullRight>
        <NavItem eventKey={1} href="/admin">Admin</NavItem>
        <NavItem eventKey={2} href="/cart">Cart 
         { (this.props.totalQty > 0)?( // if # of items in cart is > 0
                <Badge className="badge">
              {this.props.totalQty}</Badge>):('')}
        {/* display the # of items in cart, if zero items, display nothing  :{''} */}
        </NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
        )
    }
}

export default Menu;