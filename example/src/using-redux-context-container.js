import React from "react";
import createContextContainer from 'redux-context-container';

import { Block, Heading, Button } from 'reakit';
import Card from './cards.1';

// A Redux application has a single Store, where
// all the relevant data for the UI is stored.
// However it is handle by different Reducers which are
// combined into a single one. 
// Each Reducer handles a subset of the State's attributes
// And for each, we could have a UI sub-tree and actions
// We could think of it as a Domain, a business domain
// Then, a Container could be assigned for each Domain
// It will be the only point connected to the Store for that
// specific UI sub tree. 
// An application usually will be composed of several Domains and Containers,
// and a greater number of presentational component in each subtree

// This Domain is concerned about data identifying the country
const mapState = (state) => ({
    country: state.country,
    capital: state.capital,
    language: state.language,
    internet: state.internet,
});

const mapDispatch = dispatch => ({
    setState: (payload) => dispatch({ 
        type: new_country,
        payload
    })
});

// We ask our library to create and return our Container built over the React Context API
// as well as a high order function that takes care 
const {
    withIdentificationContext,
    IdentificationContainer,
} = createContextContainer(mapState, mapDispatch)('Identification');

const Section = (props) => {
    return (
        <Block width={'50%'} float={'right'}>{props.children}{props.capital}</Block>
    );
};

const BlockSection = withIdentificationContext(Section);
const CardX = withIdentificationContext(Card);

export const ColRight = () => {
    return (
        <IdentificationContainer>
            <div>qsqqq</div>
            <BlockSection>
                <CardX />
            </BlockSection>
        </IdentificationContainer>
    );
};

