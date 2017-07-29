"use strict"
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Panel, Col, Row, Well, Button, ButtonGroup, Label } from 'react-bootstrap';

import { bindActionCreators } from 'redux';
import { deleteFromCart, updateCart, getCart } from '../../actions/cartActions'
class Cart extends Component {
    componentDidMount(){
        this.props.getCart();
    }
    constructor() {
        super();
        this.state = {
            showModal: false
        }
    }
    open() {
        this.setState({ showModal: true });
    }
    close() {
        this.setState({ showModal: false });
    }
    render() {
        if (this.props.cart[0]) {
            return this.renderCart();
        } else {
            return this.renderEmpty();
        }
    }

    renderEmpty() {
        return (
            <div>

            </div>
        )
    }
    deleteItem(_id) {

        const currentBookToDelete = this.props.cart;

        const indexToDelete = currentBookToDelete.findIndex(
            (cart) => {
                return cart._id == _id;
            }
        )

        let cartAfterDelete = [...currentBookToDelete.slice(0, indexToDelete),
        ...currentBookToDelete.slice(indexToDelete + 1)
        ]

        this.props.deleteFromCart(cartAfterDelete);
    }

    onIncrement(_id) {
        this.props.updateCart(_id, 1, this.props.cart)
    }

    onDecrement(_id, quantity) {
        if (quantity > 1)
            this.props.updateCart(_id, -1, this.props.cart)
    }

    renderCart() {
        const cartItemsList = this.props.cart.map((cartArr) => {
            return (
                <Panel key={cartArr._id}>
                    <Row>
                        <Col xs={12} sm={4}>
                            <h6>{cartArr.title}</h6><span>    </span>
                        </Col>
                        <Col xs={12} sm={2}>
                            <h6>usd. {cartArr.price}</h6>
                        </Col>
                        <Col xs={12} sm={2}>
                            <h6>Qty. <Label bsStyle="success">{cartArr.quantity}</Label></h6>
                        </Col>
                        <Col xs={6} sm={4}>
                            <ButtonGroup style={{ minWidth: '300px' }}>
                                <Button bsStyle="default"
                                    onClick={this.onDecrement.bind(this, cartArr._id, cartArr.quantity)}
                                    bsSize="small">-</Button>
                                <Button bsStyle="default"
                                    onClick={this.onIncrement.bind(this, cartArr._id)}
                                    bsSize="small">+</Button>
                                <span>      </span>
                                <Button bsStyle="danger"
                                    onClick={this.deleteItem.bind(this, cartArr._id)}
                                    bsSize="small">Delete</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Panel>
            )
        }, this);
        return (
            <Panel header="Cart" bsStyle="primary">
                {cartItemsList}
                <Row>
                    <Col xs={12}>
                        <h6>Total $ {this.props.totalAmount}</h6>
                        <Button
                            onClick={this.open.bind(this)}
                            bsStyle="success" bsSize="small">
                            Proceed To Checkout
                    </Button>
                    </Col>
                </Row>
                <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Thank you</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h6>Your order has been saved</h6>
                        <p>You will recieve email confirmation shortly</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Col xs={6}>
                            <h6>Total $ {this.props.totalAmount}</h6>
                        </Col>
                        <Button onClick={this.close.bind(this)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </Panel>
        )
    }
}
function mapStateToProps(state) {
    return {
        cart: state.cart.cart,
        totalAmount: state.cart.totalAmount,
        totalQuantity: state.cart.totalQuantity
    }
}
export default connect(mapStateToProps, { deleteFromCart, updateCart,getCart })(Cart);