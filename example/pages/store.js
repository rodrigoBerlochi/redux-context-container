import { createStore } from 'redux';

const defaultState = {
    members: [
        {
            name: 'Germany',
            capital: 'Berlin',
            map: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Flag_map_of_Germany.svg'
        }, 
        {
            name: 'Denmark',
            capital: 'Copenhague',
            map: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Flag_of_Denmark.svg'
        },
        {
            name: 'Netherlands',
            capital: 'Amsterdam',
            map: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_the_Netherlands.svg/1024px-Flag_of_the_Netherlands.svg.png'
        }, 
    ]
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export const store = createStore(reducer);
