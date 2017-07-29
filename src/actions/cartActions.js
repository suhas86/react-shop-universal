"use strict"
import axios from 'axios';
//Get cart
export function getCart(){
    return function(dispatch){
        axios.get('/api/cart').then((response)=>{
            dispatch({
                type:'GET_CART',
                payload:response.data
            })
        }).catch((err)=>{
            dispatch({
                type: 'ERROR_GET_CART',
                msg: err
            })
        })
    }
}
//Add to cart
export function addToCart(cart) {
    return function (dispatch) {
        let temp=cart;
        temp.quantity=1;
        console.log("BEFORE ADD",temp);
        axios.post('/api/cart', temp).then((response) => {
            dispatch({
                type: 'ADD_TO_CART',
                payload: response.data
            })
        }).catch((err) => {
            dispatch({
                type: 'ERROR_ADD_TO_CART',
                msg: err
            })
        })
    }
}

//Update cart
export function updateCart(_id, unit, cart) {

    const currentBookToUpdate = cart;
    const indexToUpdate = currentBookToUpdate.findIndex(
        (book) => {
            return book._id == _id;
        }
    )

    const newBookToUpdate = {
        ...currentBookToUpdate[indexToUpdate],
        quantity: currentBookToUpdate[indexToUpdate].quantity + unit
    }
    let cartUpdate = [...currentBookToUpdate.slice(0, indexToUpdate),
        newBookToUpdate,
    ...currentBookToUpdate.slice(indexToUpdate +
        1)
    ]
    console.log("CART UPDATE",cartUpdate);
    return function (dispatch) {
        axios.post('/api/cart', cartUpdate).then((response) => {
            dispatch({
                type: 'UPDATE_CART',
                payload: response.data
            })
        }).catch((err) => {
            dispatch({
                type: 'ERROR_UPDATE_CART',
                msg: err
            })
        })
    }

}

//Delete item from cart
export function deleteFromCart(cart) {
    return function (dispatch) {
        
        axios.post('/api/cart', cart).then((response) => {
            dispatch({
                type: 'DELETE_FROM_CART',
                payload: response.data
            })
        }).catch((err) => {
            dispatch({
                type: 'ERROR_DELETE_CART',
                msg: err
            })
        })
    }
}