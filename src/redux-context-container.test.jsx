import React from "react";
import { createStore } from "redux";
import render from 'react-test-renderer';
import { Provider as ReduxProvider } from "react-redux";
import { createContextContainer } from "./redux-context-container";

// Redux tasks :::::::::::::::::::::::::::::::::::::::
const defaultState = {
  library: "React",
  author: "Facebook"
};
// reducer returns only default state since no action are used for this test
const reducer = (state, action) => (defaultState);
// create the store
const store = createStore(reducer);

// react redux bindings ::::::::::::::::::::::::::::::
const mapState = (state) => ({
  lib: state.library,
});

describe("Redux Context Container", () => {
  test("MapState must be of type function or null", () => {
    const fn = jest.fn();
    expect(() => {
      createContextContainer(42, fn)();
    }).toThrowError(
      "Argument: if mapStateToProps is defined it must be a function"
    );
  });

  test("MapDispatch must be of type function or null", () => {
    const fn = jest.fn();
    expect(() => {
      createContextContainer(fn, 42)();
    }).toThrowError(
      "Argument: if mapDispatchToProps is defined it must be a function"
    );
  });

  test("MapDispatch can be ausent", () => {
    const fn = jest.fn();
    expect(() => {
      createContextContainer(fn)();
    }).not.toThrow();
  });

  test("mapState can be null and dispatch defined", () => {
    const fn = jest.fn();

    expect(() => {
      createContextContainer(null, fn)();
    }).not.toThrow();
  });

  test('Argument "domain" must be string or undefined', () => {
    const fn = jest.fn();
    expect(() => {
      createContextContainer(fn)(() => {});
    }).toThrow("Argument: domain must a String");
    expect(() => {
      createContextContainer(fn, fn)();
    }).not.toThrow();
    expect(() => {
      createContextContainer(fn, fn)("Profile");
    }).not.toThrow();
  });

  test("Invoking contextContainer must return another function", () => {
    const innerFn = createContextContainer();
    expect(typeof innerFn).toBe("function");
  });

  test("The final returned object must have two key properties with the right dynamic names", () => {
    const container = createContextContainer(() => {}, null)("profile");
    expect(container).toHaveProperty("withProfileContext");
    expect(container).toHaveProperty("ProfileContainer");
  });

  test("If no domain name is passed property names are default", () => {
    const container = createContextContainer(() => {}, null)();
    expect(container).toHaveProperty("withContext");
    expect(container).toHaveProperty("Container");
  });

  test("createContextContainer must return two memers", () => {
  
    // presentational components :::::::::::::::::::::::::
    const Card = props => {
      return <div className="card">{props.children}</div>;
    };

    const Title = props => {
      return <h2>{props.lib}</h2>;
    };
    
    // Instead of using directly connect() from React-Redux 
    // to create a usual Container connected to the Store,
    // we use createContextContainer() which internally uses connect()
    // together with the React Context API.
    //
    // getting the HOC and the Context Container
    // actual context value is read from the Redux Store
    const { 
      withTechnicalContext, 
      TechnicalContainer,
    } = createContextContainer(
      mapState
    )("Technical");
   
    expect(typeof withTechnicalContext === 'function').toBe(true);    
    expect(typeof TechnicalContainer === 'function').toBe(true);
  });

  test('Child using the HOC must receives values from the context', () => {
    /**
     * Here we test the full functionality.
     * This library does not make magic, it's just a 
     * helper to write less repetitive code and to enforce us
     * to remind a possible CONSISTENT architecture to our app. The worst of
     * a react-redux app, is to give it a messy random structure. 
     * 
     * Our library just remind us we can structure our app based on business-domains,
     * each one corresponding to a UI section / reducer / action set. It remind us we can
     * avoid connect()ing a thousand components to the Store. As well as connect()ing only
     * the top-level root component of the app, and passing down from there all the store and
     * actions. Both extremes drive us toward hard to understand code. 
     * In a middle point, we can have a restrained and easy to find number of Containers,
     * which are the only responsibles to read the Store and pass down values. And that provide
     * for that a Context based mechanism. 
     * 
     * This library is a creator of such Containers. It implements underhood the code
     * to bind to the Store, pass the slice of it to a Context, creating it and the Provider and
     * Consumer. It also abstracts the usage of the Consumer, saving us of writing that repetitive
     * boilerplate code once and again for each child. And it can save us of drilling down dozen of
     * levels until we get the component that really want some prop.
     */
    const { 
      withFrameworksContext, 
      FrameworksContainer,
    } = createContextContainer(
      mapState
    )("Frameworks");

    const Block = ({lib}) => (<p>{lib}</p>);

    // ADVICE: you must pass a reference to the component as parameter,
    // and not the component invoked. Wrong: <Block />
    const Paragraph = withFrameworksContext(Block);

    // we add the redux provider to simulate the full environment of a React Redux application
    // NOTICE you don't need to pass a 'value' attribute to this ColorsContainer, because our
    // tiny library took care of it underhood. And the only value that we want here is the state' slice
    // from the central redux store. 
    const nodes = render.create(
      <ReduxProvider store={store}>
        <FrameworksContainer>
          <Paragraph />
        </FrameworksContainer>
      </ReduxProvider>
    );

    expect(nodes.root.findByType(Block).props.lib).toBe(defaultState.library);
  });
});
