import { createContextContainer } from '../../src/index';

// this module implements the library redux-context-container
// this is specific to each application **and each Container/Domain of it**

const mapState = (state) => ({
    title: state.members[2].name,
    text: state.members[2].capital,
    url: state.members[2].map,
});

// not needed, just for demo purpouses
const mapDispatch = null;

export const {
    ExampleContainer,
    withExampleContext,
} = createContextContainer(mapState, mapDispatch)('example');