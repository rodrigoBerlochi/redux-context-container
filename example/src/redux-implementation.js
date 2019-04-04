import { createStore } from 'redux';
import { new_country } from './regular-approach';

// initial state
const initState = {
    country: 'Netherlands',
    capital: 'Amsterdam',
    language: 'Dutch',
    monarch: 'Willem-Alexander',
    primeMinister: 'Mark Rutte',
    water: 18.41,
    population: 17308133,
    hdi: 0.931,
    currency: 'euro',
    internet: 'nl',
    flagImg: 'https://banner2.kisspng.com/20180422/wyq/kisspng-flag-of-the-netherlands-emoji-flag-of-greece-flag-waving-5adcefda3863c9.126882371524428762231.jpg',
};

// create a reducer
const reducer = (state = initState, action) => {
    switch (action.type) {
        case new_country:
            return {...state, country: action.payload};
        default:
            return state;
    }
};

// create the store
export const store = createStore(reducer);