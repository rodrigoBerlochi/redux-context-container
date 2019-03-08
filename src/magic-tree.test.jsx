import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import TestRenderer from 'react-test-renderer';
import { createMagicTree } from './magic-tree';

describe('Redux Magic Tree', () => {
  test('MapState must be of type function or null', () => {
    const fn = jest.fn();
    expect(() => {
      createMagicTree(42, fn)();
    }).toThrowError(
      'Argument: if mapStateToProps is defined it must be a function'
    );
  });

  test('MapDispatch must be of type function or null', () => {
    const fn = jest.fn();
    expect(() => {
      createMagicTree(fn, 42)();
    }).toThrowError(
      'Argument: if mapDispatchToProps is defined it must be a function'
    );
  });

  test('Outer function must accept first or second parameter to be NULL or undefined', () => {
    const fn = jest.fn();
    expect(() => {
      createMagicTree(fn)();
    }).not.toThrow();
    expect(() => {
      createMagicTree(null, fn)();
    }).not.toThrow();
  });

  test('Argument "domain" must be string or undefined', () => {
    const fn = jest.fn();
    expect(() => {
      createMagicTree(fn)(() => {});
    }).toThrow('Argument: domain must a String');
    expect(() => {
      createMagicTree(fn, fn)();
    }).not.toThrow();
    expect(() => {
      createMagicTree(fn, fn)('Profile');
    }).not.toThrow();
  });

  test('Invoking createMagicTree must return another function', () => {
    const innerFn = createMagicTree();
    expect(typeof innerFn).toBe('function');
  });

  test('The final returned object must have two key properties with the right dynamic names', () => {
    const magicTree = createMagicTree(() => {}, null)('profile');
    expect(magicTree).toHaveProperty('withProfileContext');
    expect(magicTree).toHaveProperty('ProfileContainer');
  });

  test('If no domain name is passed property names are default', () => {
    const magicTree = createMagicTree(() => {}, null)();
    expect(magicTree).toHaveProperty('withContext');
    expect(magicTree).toHaveProperty('Container');
  });

  test('The HOC returns a component with access to values from mapStateToProps', () => {
    const mapState = () => ({
      library: 'React',
      author: 'Facebook'
    });
    // dummy components
    const Card = props => {
      return <div>{props.children}</div>;
    };

    console.log(TestRenderer.create(<Card>{'hola'}</Card>).toJSON());

    const Title = props => {
      return <h2>{props.library}</h2>;
    };

    // getting the HOC and the Container
    const { withTechnicalContext, TechnicalContainer } = createMagicTree(
      mapState
    )('Technical');
    const CardWrapped = withTechnicalContext(Card);

    const Tree = () => {
      return (
        <TechnicalContainer>
          <CardWrapped>
            <Title />
          </CardWrapped>
        </TechnicalContainer>
      );
    };

    const store = createStore(() => {});

    const ComposedTree = () => {
      return (
        <Provider store={store}>
          <Tree />
        </Provider>
      );
    };

    const testRenderer = TestRenderer.create(<ComposedTree />);
    const inner = testRenderer.root.find(Title);
    console.dir(inner.props);
  });
});
