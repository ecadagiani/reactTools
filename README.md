# reactTools
My React tools: functions, class, ...

### flattenChildren
Get an indented array of children, return an flat array od this children


### joinChildren
Get an array of component, an render method, and an separator. And return an array of component,
who each component was render with the render method, and are separated by the separator.


### componentTypeStringToComponent
Get an component type in string, return an React component of this type

Example:
```javascript
componentTypeStringToComponent( "textarea" )
```


### isComponent
Test if an var is an React component.

Example:
```javascript
return (
    <>
        {isComponent( MyComponent ) ? <MyComponent /> : MyComponent}
    </>
)
```


### recursePropTypes
To create an recursive prop-types

Example:
```javascript
import PropTypes from "prop-types";

export const formErrors = PropTypes.oneOfType([
    PropTypes.arrayOf( recursePropTypes(() => formErrors )),
    PropTypes.objectOf( recursePropTypes(() => formErrors )),
    PropTypes.shape({
        valid: PropTypes.bool,
        messages: PropTypes.arrayOf( PropTypes.string ),
    }),
]);
```


### mapComponent
Get an array, and a component class, return an array of component,
who each element get an item of array in props.


### mapConnect
Create an array of component, each are connected to redux.

Example:
```javascript
const mapStateToProps = ( state ) => ({
    value: state.value,
});
const mapDispatchToProps = dispatch => ({
    anAction: bindActionCreators(anAction, dispatch ),
});
const MyConnectedComponentArray = mapConnect(
    ( state ) => state.myArray,
    mapStateToProps,
    mapDispatchToProps,
)( MyComponent );
```
