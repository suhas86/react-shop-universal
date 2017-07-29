"use strict"
import {combineReducers} from 'redux';

import {bookReducers} from './bookReducers.js';
import {cartReducers} from './cartReducers.js'

export default combineReducers({
    books:bookReducers,
    cart:cartReducers
})