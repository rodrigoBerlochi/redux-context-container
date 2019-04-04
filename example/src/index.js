import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';

import { Block, Heading } from 'reakit';

import { store } from './redux-implementation';
import ColLeft from './regular-approach';
import { ColRight } from './using-redux-context-container';

class App extends React.Component {
  render() {
    return (
      <Block>
        <ColLeft />
        <ColRight />
      </Block>
    );
  }
}

var mountNode = document.getElementById("app");
ReactDOM.render(
  <Provider store={store}>
    <App name="Jane" />
  </Provider>, 
  mountNode
);