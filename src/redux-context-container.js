import React, { createContext } from 'react';
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
export default (mapStateToProps = null, mapDispatchToProps = null) => (
  domain = '',
) => {
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

  // React Context creation for this Container
  const Context = createContext();
  const { Consumer, Provider } = Context;

  /**
   * @description HOC wraps easily a Presentational component that
   * is usually direct child of the corresponding container and
   * is also parent of a presentational tree (Root tree layer).
   * Every child of the returned component will get access to
   * all of the props for this Domain/Container, without need of
   * passing them explicitly on each level.
   * @param {React.Component} Component
   * @returns {React.Component}
   */
  function withContext(Component) {
    return function WrapperComponent(props) {
      // the new component get all the props passed manually
      // but also we spread context attributes as properties
      return (
        <Consumer>
          {context => {
            return <Component {...context} {...props} />;
          }}
        </Consumer>
      );
    };
  };
  
  /**
   * Basic scaffolding for a Context-Container
   * It is a React component that must be able to hangle a Children tree
   * which is returned wrapped in the Provider that links to the Context specific 
   * to this Container. 
   * Each Container conceptually represents a Domain of our app (state slice/UI fragment)
   * The Context-Container must get all of the properties received (except the children which is
   * a React tree) and set them as Values for this Context. Those props are taken directly 
   * from the Redux Store in a next step. 
   * @see https://redux.js.org/basics/usage-with-react#presentational-and-container-components
   */
  class innerContainer extends React.Component {
    render() {
      const { children, ...restProps } = this.props;

      return <Provider value={{ ...restProps }}>{children}</Provider>;
    }
  }

  // just for semantic when we have several Containers, 
  // we use the Domain name to identify exported memebers 
  // fo this Container
  const Domain = capitalize(domain);
  const hocName = `with${Domain}Context`;
  const containerName = `${Domain}Container`;

  // Now we tale care of binding the created Container 
  // to the Redux Store, as usual in any Redux app
  // Users shouldn't need to do it by themselves
  // just to express required props and dispatch methods
  const Container = connect(
    mapStateToProps,
    mapDispatchToProps,
  )(innerContainer);

  // Public API to use on our app
  return {
    [hocName]: withContext,
    [containerName]: Container,
  };
};
