const React = require( "react" );


/**
 * Retourne un composant, qui retournera un tableau de CustomComponent (un par element du tableau). Chaque composant recevra l'item dans ses props
 *
 * Par default la key utilisé est l'index, mais elle peut être overwrite avec un champ id dans les items du tableau
 * @param {Object[]} array - tableau
 * @param {Component} CustomComponent - Composant à multiplier
 * @return {Component}
 * @example
 * cons monArray = [{id: "a1", title: "component A1"}, {id: "b2", title: "component B2"}];
 * const mesComponents = mapComponent(monArray, CustomComponent);
 */
export function mapComponent ( array = [], CustomComponent ) {
    return ( props ) => (
        <React.Fragment>
            {array.map(( item, index ) => (
                <CustomComponent key={item.id || index} {...item} {...props}/>
            ))}
        </React.Fragment>
    );
}


/**
 * Function qui prends en argument le state, et retourne un tableau
 * @callback arrayToProp
 * @param {Object} state
 * @return {Object[]}
 */
/**
 * @callback mapStateToProps
 * @param {Object} state
 * @return {Object}
 */
/**
 * @callback mapDispatchToProps
 * @param {Object} dispatch
 * @return {Object}
 */

/**
 * Permet de connecter un Composant, qui retournera un tableau de Component (un par element du tableau récupérer via arrayToProp)
 * @param arrayToProp {arrayToProp}
 * @param mapStateToProps {mapStateToProps}
 * @param mapDispatchToProps {mapDispatchToProps}
 * @param connect {function} - redux connect function
 * @return {Component}
 * @example
 * const mapStateToProps = ( state ) => ({ ... });
 * const mapDispatchToProps = dispatch => ({ ... });
 * const arrayToProp = state => state.monArray;
 * const ListConnectedCardChart = mapConnect( arrayToProp, mapStateToProps, mapDispatchToProps )( MyComponent );
 */
export function mapConnect ( arrayToProp, mapStateToProps, mapDispatchToProps, connect ) {
    const mapStateToPropArray = state => ({
        array: arrayToProp( state )
    });

    return ( CustomComponent ) => {
        const ConnectedCustomComponent = connect( mapStateToProps, mapDispatchToProps )( CustomComponent );
        const MapConnectedCustomComponent = ({array = []}) => (
            <React.Fragment>
                {array.map(( item, index ) => (
                    <ConnectedCustomComponent key={item.id || index} {...item} />
                ))}
            </React.Fragment>
        );
        return connect( mapStateToPropArray, null )( MapConnectedCustomComponent );
    };
}
