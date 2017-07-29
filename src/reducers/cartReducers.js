"use strict"

export function cartReducers(state = { cart: [] }, action) {
    switch (action.type) {
        case "GET_CART":
        return {
            ...state,
            cart:action.payload,
            totalAmount:totals(action.payload).amount,
            totalQuantity: totals(action.payload).quantity
        }
        case "ADD_TO_CART":
            return {
                ...state,
                cart: action.payload,
                totalAmount: totals(action.payload).amount,
                totalQuantity: totals(action.payload).quantity
            }
            break;
        case "UPDATE_CART":

            return {
                ...state,
                cart: action.payload,
                totalAmount: totals(action.payload).amount,
                totalQuantity: totals(action.payload).quantity
            }

        case "DELETE_FROM_CART":
            return {
                ...state,
                cart: action.payload,
                totalAmount: totals(action.payload).amount,
                totalQuantity: totals(action.payload).quantity
            }
    }

    return state;
}


//Calculate Totals
export function totals(payloadArr) {
    const totalAmount = payloadArr.map((cartArr) => {
        return cartArr.price * cartArr.quantity;
    }).reduce(function (a, b) {
        return a + b;
    }, 0); //Start summing from index 0

    const totalQuantity = payloadArr.map((qty) => {
        return qty.quantity;
    }).reduce(function (a, b) {
        return a + b;
    }, 0);

    return {
        amount: totalAmount.toFixed(2),
        quantity: totalQuantity
    };
}