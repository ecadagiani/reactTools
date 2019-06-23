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


module.exports = {
    flattenChildren,
    joinChildren,
};
