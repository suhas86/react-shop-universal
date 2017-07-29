"use strict"

import React, { Component } from 'react';
import { Well, Col, Row, Button ,Image} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addToCart, updateCart } from '../../actions/cartActions';

class BookItem extends Component {
    handleCart() {
        let addQuantity = this.props.book;
        addQuantity.quantity = 1;
        const book = [...this.props.cart, addQuantity];
        //Check if product exists

        if (this.props.cart.length > 0) {
            console.log("ID",this.props.book._id)
            let _id = this.props.book._id;

            let cartIndex = this.props.cart.findIndex((cart) => {
                return cart._id == _id
            });
            //If returns -1 cart doesnt have the product
            if (cartIndex === -1) {
                this.props.addToCart(book);
            } else {
                
                this.props.updateCart(_id, 1,this.props.cart)
            }
        } else {
            console.log("BOOK",book)
            this.props.addToCart(book);
        }

    }
    render() {
        return (
            <Well>
                <Row>
                    <Col xs={12} sm={4}>
                         <Image src={this.props.book.images} responsive />   
                    </Col>
                    <Col xs={6} sm={8}>
                        <h6>{this.props.book.title}</h6>
                        <p>{this.props.book.description}</p>
                        <h6>{this.props.book.price}</h6>
                        <Button onClick={this.handleCart.bind(this)} bsStyle="primary">Buy Now</Button>
                    </Col>
                </Row>
            </Well>
        )
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart.cart
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addToCart,
        updateCart
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BookItem);