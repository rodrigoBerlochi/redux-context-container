import React from "react";
import { createStore } from "redux";
import { Provider as ReduxProvider } from "react-redux";
import TestRenderer from "react-test-renderer";
import { createContextContainer } from "./redux-context-container";

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
});
