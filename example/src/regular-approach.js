import React from "react";
import { Block, Heading, Button } from 'reakit';
import { connect } from 'react-redux';
import Card from './cards';
import { button } from './styles';

const Section = ({
    country,
    capital,
    language,
    img,
    setState,
}) => (
    <Block width={'50%'} float={'left'}>
        <Heading>Regular approach</Heading>
        {/* 
            We will show some props into a Card, then we need to pass them through this
            component to the next level. That could repeated once per each level depending
            on how mmuch deep is the tree. That's kind of annoying and is known as props drilling. 
            Store -> Container -> Presentational Component 1 -> Presentational Component 2 -> ...
            
            Some approaches will pass the whole prop object to the next level {...props}, or the
            remaining props not used on the current level {...rest}. Another design will connect()() 
            each different level directly to the Store. 
        */}
        <Card 
            title={country}
            imgUrl={img}
            text={`${country} official language is ${language} and the capital city is ${capital}`}
        />
        <Button style={button} onClick={() => { setState('Spain'); }}>Change country name</Button>
    </Block>
);

const mapState = (state) => ({
    country: state.country,
    capital: state.capital,
    language: state.language,
    img: state.flagImg,
});


export const new_country = 'NEW_COUNTRY';

const mapDispatch = dispatch => {
    return {
        setState: (payload) => dispatch({ 
            type: new_country,
            payload
        }),
    }
};

export default connect(mapState, mapDispatch)(Section);
