"use strict"

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getBooks } from '../../actions/booksActions';
import { Grid, Col, Row, Button, Carousel } from 'react-bootstrap';

import BookItem from './bookItem';
import BooksForm from './booksForm';
import Cart from './cart';

class BookList extends Component {
    componentDidMount() {
        this.props.getBooks();
    }
    render() {

        const booksList = this.props.books.map((book) => {
            return (
                <Col xs={12} md={4} sm={6} key={book._id}>
                    <BookItem book={book} />
                </Col>
            )
        });

        return (
            <Grid>
                <Row>
                    <Carousel>
                        <Carousel.Item>
                            <img width={900} height={500} alt="900x500" src="/images/banner1.jpg" />
                            <Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Some Text.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img width={900} height={500} alt="900x500" src="/images/banner2.jpg" />
                            <Carousel.Caption>
                                <h3>Second slide label</h3>
                                <p>Some Text.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Row>
                <Row>
                    <Cart />
                </Row>
                <Row style={{ marginTop: '15px' }}>

                    {booksList}
                </Row>
            </Grid>
        )
    }
}
function mapStateToProps(state) {
    return {
        books: state.books.books
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getBooks: getBooks }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(BookList);