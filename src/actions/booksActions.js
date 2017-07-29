"use strict"
import axios from 'axios';

//Get Books
export function getBooks() {
    return function (dispatch) {
        axios.get('/api/books').then((response) => {
            dispatch({
                type: "GET_BOOKS",
                payload: response.data
            })
        }).catch((err) => {
            dispatch({
                type: "GET_BOOKS_REJECTED",
                payload: err
            })
        });
    }
    /*
    return {
        type: "GET_BOOKS"
    }
    */
}
//Post a book
export function postBooks(book) {

    return function (dispatch) {
        axios.post("/api/books", book).then((response) => {
            console.log("Response ", response.data)
            dispatch({
                type: "POST_BOOK",
                payload: response.data
            })
        }).catch(function (err) {
            dispatch({
                type: "POST_BOOK_REJECTED",
                payload: "There was error while posting"
            })
        })
    }
    /*
    return {
        type: "POST_BOOK",
        payload: book
    }
    */
}

//Delete a book
export function deleteBook(id) {
    return function (dispatch) {
        axios.delete('/api/books/' + id).then((response) => {
            dispatch({type:"DELETE_BOOK",payload:id});
        }).catch((err) => {
            dispatch({
                type: "DELTE_BOOK_REJECTED",
                payload: err
            })
        })
    }
    /*
    return {
        type: "DELETE_BOOK",
        payload: id
    }
    */
}
//Update a book
export function updateBook(book) {
    return {
        type: "UPDATE_BOOK",
        payload: book
    }
}
//RESET BUTTON
export function resetBook(book) {
    return {
        type: "RESET_BOOK"
    }
}