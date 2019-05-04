# redux-context-container

[![Build Status](https://travis-ci.org/rodrigoBerlochi/redux-context-container.svg?branch=master)](https://travis-ci.org/rodrigoBerlochi/redux-context-container)
[![npm version](https://img.shields.io/npm/v/redux-context-container.svg?style=flat-square)](https://www.npmjs.com/package/redux-context-container)
[![npm downloads](https://img.shields.io/npm/dm/redux-context-container.svg?style=flat-square)](https://www.npmjs.com/package/redux-context-container)
[![cov statements](https://github.com/rodrigoBerlochi/redux-context-container/blob/master/.badges/badge-statements.svg)](https://www.npmjs.com/package/redux-context-container)

[![cov lines](https://github.com/rodrigoBerlochi/redux-context-container/blob/master/.badges/badge-lines.svg)](https://www.npmjs.com/package/redux-context-container)
[![cov functions](https://github.com/rodrigoBerlochi/redux-context-container/blob/master/.badges/badge-functions.svg)](https://www.npmjs.com/package/redux-context-container)
[![cov branches](https://github.com/rodrigoBerlochi/redux-context-container/blob/master/.badges/badge-branches.svg)](https://www.npmjs.com/package/redux-context-container)

## Summary

** Work In Progress: not ready to consume, v2.0.0**
Create React Containers that rely on React Context to share properties in a Tree. Get rid of prop-drilling but still leverage the better parts of Redux. Avoid connecting every component to the Redux store. 

## Overview

State Management for React apps is a field plenty of polemics, tools and architectural designs. From the original Flux Architecture by Facebook, to implementations like Redux or Mobx. From middlewares like Thunks to Sagas. From State handle directly by React relaying on setState(), to the disruptive Context API. And we can even find another good options like Unstated. Great articles written by Kent Dodds or Dan Abramov are out there.

Redux has given us excellent answers for cases when we need Redux. I'm still stand for Redux. Problems around this library are the result mostly of poor evaluation of the needs (You might not need Redux), as well as poor understanding and reading of the documentation. I've seen Redux-based projects written in a way that is far from the good practices described in the official documentation. I've seen people storing types of data into the State that is not meant to be there.

If the project needs Redux and the user has understood how to use it, Redux ships with a lot of solutions well documented and nowaday, standardized in the community. And that means more organized and predictable code.

Two antipatterns of Redux have been: 1) connecting EVERY component, and 2) embed Redux in "reusable" components.
When a reusable component gets mixed with Redux code (or whatever state management code) it is no longer reusable. 
When every component is connected to the Redux State, we end with a nightmare. The promise of maintenable and predictable code of Flux or Redux, has gone. That's more a design problem that one caused by the library. 

Time ago I read a smart article online (link to be added) describing architectures to integrates React apps and their States. One common error is linking a thousand components to the Store :(

The last approach described combined Redux and Context API. The idea is to have a layer of Containers between the layer of the Global State and the Presentational components layers. Usually the UI is composed of several sub-trees organized in a main UI tree. The only layer that is allowed to connect to Redux Store, is the Containers one. They can read an slice of the State and make it available to the whole subtree below it. No matter how deep it is. Logically each subtree of the UI has a common purpose, as each slice of the State share a purpose. It could be observed also in the different reducers implemented, combined in the general one. 

Containers in this proposition, make use of React Context API. Each container holds a context whose values are the attributes from the taken form the State. Using Context, we leverage the functionality of Consumers: instead of passing down explicitly every required prop from the higher component in the subtree to each of the components below, we leave each subcomponent to leverage Consumers. When a component nested in the subtree needs to read a value from the state, it can use the consumer to connect to its container, not the Redux Store.

To modify values in the Store, subcomponents wrapped in the consumer can get Actions from the Container or from an specific action files. 

The benefits of this approach are:

- If your app needs Redux, all the pros of it are there:
    - global state
    - actions as a standardized way to perform changes
    - reducers combined to get a single global state, but handle better in smaller pieces
    - reducers to centralize operations that actually change the State
    - a store implementation that protects State of changes out of the rules and notify React of updates
    - all the Redux performance optimizations
    - Redux DevTools
- tracking connections to the Redux store is easier: just Containers can do it
- passing properties from connected components to deep nested children is easier: components do not read from the parent but from the context using the consumer. We don't need to recall adding or removing properties that are not needed at this level because they are in some far place below. 

## Using redux-context-container

This library abstract the process of creating Containers that rely on React Context and connect to a Redux infrastructure. It is a simple process but still repetitive. 

You creating the Redux implementation for your app: the Store, the Reducers combined in a single one, Actions... Your root is wrapped into the react-redux <Provider store={store}>
Now we want to create a layer of containers. It might match the reducers already created, if each one of them represents a Domain of the application: a slice of the State and the UI rendering it. Also, a set of Actions will reference that Domain. 
Then we are ready to create a container for each domain. Things we need to take care: 

- the container has to connect to the store
- values from the store must be integrated to the Context
- a Provider must be wrapping all the children of the container
- a Consumer must be in scope and wrapping all of the Presentational components that read value from the container

redux-context-container takes care of all that. It just need mapStateToProps and mapDispatchToProps as input, and optionally a domain name to indetify the output for this container. The library then returns a Container and high order component that links which ever component with the context. 


## Usage
```javascript
// the lib has a single default export. That is function that creates this
// special kind of containers
import { createContextContainer } from 'redux-context-container';

const {
    NavigationContainer,
    withContextNavigation,
} = createContextContainer(mapStateToProps, mapDispatchToProps)('navigation');

const NavigationCard = withContextNavigation(Card);

class SomeSubTree extends Component {
    ...
    render() {
        <NavigationContainer>
            <NavigationCard />
        </NavigationContainer>
    }
}

```
See the example directory for a more detailed usage. 

## Performance and other Considerations
TODO

## Further Readings
TODO
