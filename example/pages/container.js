import { createContextContainer } from '../../dist/redux-context-container';

// this module implements the library redux-context-container
// this is specific to each application **and each Container/Domain of it**

const mapState = (state) => ({
    name: state.members[2].name,
    capital: state.members[2].capital,
    map: state.members[2].map,
});

// not needed, just for demo purpouses
const mapDispatch = null;

export const {
    ExampleContainer,
    withExampleContext,
} = createContextContainer(mapState, mapDispatch)('example');