import React from 'react';
import { connect } from 'react-redux';
import capitalize from 'lodash.capitalize';

/**
 * We mimic the connect() signature, since internally we will take care of connect()
 * for this container-component.
 * The returned function must be invoked with the name of the current Domain, as a recommendation.
 * If not, generated members won't include any reference in their names to the Domain.
 * A Domain is an abstraction of a concern of our application, that owns a slice of the State
 * and is rendered in an specific UI section.
 * @param {Object|null} mapStateToProps https://react-redux.js.org/using-react-redux/connect-mapstate
 * @param {Object|null} mapDispatchToProps https://react-redux.js.org/using-react-redux/connect-mapdispatch
 * @returns {Function}
 */
export const createContextContainer = (mapStateToProps, mapDispatchToProps = null) => (domain = '') => {
    // Validations
    if (mapStateToProps !== null && typeof mapStateToProps !== 'function') {
        throw new Error(
        'Argument: if mapStateToProps is defined it must be a function',
        );
    }

    if (
        mapDispatchToProps !== null
        && typeof mapDispatchToProps !== 'function'
        && typeof mapDispatchToProps !== 'object'
    ) {
        throw new Error(
        'Argument: if mapDispatchToProps is defined it must be a function or an object',
        );
    }

    if (typeof domain !== 'string') {
        throw new Error('Argument: domain must a String');
    }

    const Context = React.createContext({});
    // creates a generic container that wraps its children into its own Provider
    // and pipes remaining properties as Value of the context
    // except children, all props will be set from the Redux State via connect()
    // https://redux.js.org/basics/usage-with-react#presentational-and-container-components
    class _ContextContainer extends React.Component {
        render() {
            const {children, ...rest} = this.props;

            return (
                <Context.Provider value={rest}>
                    {children}
                </Context.Provider>
            );
        }
    }

    // set slice from the Redux State as values of this Context-Container
    // they will be available for every children reading the context
    const ContextContainer = connect(mapStateToProps, mapDispatchToProps)(_ContextContainer);

    // creates a Reader/Consumer of this context-container
    // it sets all the values from this Context as Props of the direct child
    // as well as pipes other values passed as props to it when consuming the component
    function withContext (Component) {
        return function WrappedComponent (props) {
            return (
                <Context.Consumer>
                    {context => <Component {...context} {...props} />}
                </Context.Consumer>
            );
        }
    }

    // just for semantics, when we have several Containers, 
    // we use the Domain name to identify exported memebers 
    // fo this Container
    const Domain = capitalize(domain);
    const hocName = `with${Domain}Context`;
    const containerName = `${Domain}Container`;

    // public API
    return {
        [containerName]: ContextContainer,
        [hocName]: withContext,
    }
};