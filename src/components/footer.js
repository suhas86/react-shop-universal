"use strict"
import React,{Component} from 'react';
import {Nav,Navbar,NavItem,Badge} from 'react-bootstrap';

class Footer extends Component{
    render(){
        return (
            <footer className="footer text-center">
                <div className="container">
                    <p className="footer-text">
                        Copyright 2017 MEAN shop. All rights reserved
                    </p>
                </div>
            </footer>
        )
    }
}

export default Footer;