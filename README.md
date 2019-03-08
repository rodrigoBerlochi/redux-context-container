# redux-magic-tree

createMagicTree(mapStateToProps, mapDispatchToProps)('domainname');

/\*\*

- Inputs
- - context name?
- - defaultVals for context?
- - presentational components that init the consumer tree
- - a mapState callback
- - a mapDispatch callback
-
-
- Outputs
- - a container component, a class?, that returns children wrapped by Provider, and which is already connected to the Redux Store
- - a HOC to wrapp inner tree starter in a consumer
- - separate dispatch props
-
- no puede devolver el container hasta que no tenga los dos MAPS, y el defaultVal para context
-

\*/
