const React = require("react");

//from https://github.com/smooth-code/react-flatten-children
function flattenChildren(children) {
    return React.Children.toArray(children).reduce((flatChildren, child) => {
        if (child.type === React.Fragment) {
            return flatChildren.concat(flattenChildren(child.props.children));
        }
        flatChildren.push(child);
        return flatChildren;
    }, []);
}


function joinChildren(children, render, renderSeparator) {
    return children.reduce((result, child, index) => {
        if (index < children.length - 1) {
            return result.concat([render(child, index), renderSeparator(index + "-separator")]);
        }

        return result.concat(render(child, index));
    }, []);
}


function componentTypeStringToComponent(str){
    switch (str) {
    case "textarea":
        return <textarea/>;
    case "input":
        return <input/>;
    case "span":
        return <span/>;
    case "a":
        return <a/>;
    case "button":
        return <button/>;
    case "p":
        return <p/>;
    case "div":
    default:
        return <input/>;
    }
}


function isComponent ( value ) {
    return typeof value === "function" || value instanceof React.Component;
}


function recursePropTypes ( getPropTypeCallback ) {
    return function () {
        return getPropTypeCallback().apply( this, arguments );
    };
}


module.exports = {
    flattenChildren,
    joinChildren,
    componentTypeStringToComponent,
    isComponent,
    recursePropTypes,
};
