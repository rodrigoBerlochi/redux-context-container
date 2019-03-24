# redux-context-container

## Summary

With the implementation of Context in React, discussions arised regarding Redux being replaced by React Context. There are great articles about it, that I include in the Further Readings section. There are also poor discussions about this, that sometimes are built on top of a lack of knowledge about React and Redux. 

Context is long-awaited feature of React, and in some use cases it can work pretty well as the State Management approach. Redux, on the other hand, is the defacto State Manager for React applications. And even when you might not need Redux, for thousands of uses cases and big companies around the world, it is still the right answer.

React Context as State Manager provides simplicity and a consice code. It lacks however of mechanisms and standards that Redux provides and that stick our application to the Flux architecture (which is part of the React world too). Actions to update the State, Store design for an unidirectional data flow, time travel debugging, redux dev tools, thunks and sagas for async flows, etc. If your are wondering about how to get all that when replacing Redux with Context, you might need Redux. It is a good way to avoid re-inventing the wheel. The study of Redux documentation can tell us the patterns to write more concise and correct Redux applications.

If it is true that some use cases could work better with just Context and other with Redux, it's also true that some people find a third scenario where Redux and Context could play together. This small library tries to express that architectural concept in a tangible way. And using it you should be able to experiment with that pattern without writing a repetitve code.

This library, hence, is and experiment of those concepts expressed at theoretical level. 

## The Pattern

Using Redux in our React application results in a Flux architecture, plus a useful central store, a standard and predicatable pattern to trigger changes in our application, techniques to test our code and tools to debug it. 

When we add React Context to the previous schema, we get an extra advantage: we can create Containers with the ability to pass properties to their children trees without the need of doing it explicetely. That's an interesting experiment. Until now, the way to avoid props drilling was Redux connect() on each component that needs access to some State attribute. And then to pass required properties down in the tree adding them to each level-component. That's the correct way. 

Here we have a second approach. We still use Redux connect() but only for Container components. Each Container implements internally a Context, where the slice of the State defined inside the connect() method, lives accesible for all of the children of that Container, no matter how deep nested they are. Children have access thanks to the Consumer of that Container. 

The architectural proposal was defined in several layers:

- A Global State layer: the usual Redux Store

- A Containers layer: usual Containers from React-Redux applications. But now each one create a React Context with a slice of the global State. And export a Consumer for the next layer. This layer connects() with Redux Store. 

- A root-tree layer: one root component per UI tree. This component's level make use of the Consumer

- Presentational components layer: here resides all the also known as dumb components, focused on rendering view fragments and decoupled from the State implementation 

## Usage
```javascript
// the lib has a single default export. That is function that creates this
// special kind of containers
import createReduxContextContainer from 'redux-context-container';

createReduxContextContainer(mapStateToProps, mapDispatchToProps)('domainname');

```


## Performance and other Considerations

## Further Readings
