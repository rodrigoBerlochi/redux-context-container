import React, { createContext, Component } from 'react';
import { connect } from 'react-redux';
import { capitalize } from 'lodash.capitalize';

export const createMagicTree = (
  mapStateToProps = null,
  mapDispatchToProps = null
) => (domain = '') => {
  if (mapStateToProps !== null && typeof mapStateToProps !== 'function') {
    throw new Error(
      'Argument: if mapStateToProps is defined it must be a function'
    );
  }

  if (
    mapDispatchToProps !== null &&
    typeof mapDispatchToProps !== 'function' &&
    typeof mapDispatchToProps !== 'object'
  ) {
    throw new Error(
      'Argument: if mapDispatchToProps is defined it must be a function or an object'
    );
  }

  if (typeof domain !== 'string') {
    throw new Error('Argument: domain must a String');
  }

  const Context = createContext();
  const { Consumer, Provider } = Context;

  /**
   * @description HOC wraps easily a Presentational component that
   * is usually direct child of the corresponding container and
   * is also parent of a presentational tree.
   * Every child of the returned component will get access to
   * all of the props for this Domain/Container, without need of
   * passing them explicitly on each level.
   * @param {React.Component} Component
   * @returns {React.Component}
   */
  const withContext = Component => {
    return function WrapperComponent(props) {
      return (
        <Consumer>
          {context => {
            return <Component {...context} {...props} />;
          }}
        </Consumer>
      );
    };
  };

  class innerContainer extends Component {
    render() {
      const { children, ...restProps } = this.props;

      return <Provider value={{ ...restProps }}>{children}</Provider>;
    }
  }

  const Domain = capitalize(domain);
  const hocName = `with${Domain}Context`;
  const containerName = `${Domain}Container`;

  const Container = connect(
    mapStateToProps,
    mapDispatchToProps
  )(innerContainer);

  return {
    [hocName]: withContext,
    [containerName]: Container
  };
};
